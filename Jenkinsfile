pipeline {
    agent any
    environment {
        DOCKER_TOKEN = credentials('dockerhub-hua-token')
        DOCKER_USER = 'ba055482'
        // DOCKER_SERVER = 'ghcr.io'
        DOCKER_PREFIX = 'ba055482/hua-ui'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building docker image...'

                script {
                    sh '''
                        HEAD_COMMIT=$(git rev-parse --short HEAD)
                        TAG=$HEAD_COMMIT-$BUILD_ID
                        docker build --rm -t $DOCKER_PREFIX:$TAG -t $DOCKER_PREFIX:latest -f hua-ui.Dockerfile .
                    '''

                    //echo $DOCKER_TOKEN | docker login $DOCKER_SERVER -u $DOCKER_USER --password-stdin
                    sh '''
                        echo $DOCKER_TOKEN | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_PREFIX --all-tags
                    '''
                }
            }
        }

        
        stage('Deploy') {
            steps {
                echo 'Deploying to k8s cluster...'

                script {
                    sh '''
                        HEAD_COMMIT=$(git rev-parse --short HEAD)
                        TAG=$HEAD_COMMIT-$BUILD_ID
                        kubectl config use-context microk8s
                        kubectl set image deployment/ui-deploy ui=$DOCKER_PREFIX:$TAG
                        
                        RUNNING_TAG=$(kubectl get pods -o=jsonpath="{.items[*].spec.containers[*].image}" -l component=ui | grep $TAG)
                        FOUND=$(echo $RUNNING_TAG | wc -l)
                        timeout --preserve-status 3m bash -c -- "while [ $FOUND -eq 0 ] ; do echo \"waiting\" sleep 1; done"
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Deleting docker resources...'

                script {
                    sh '''
                        docker system prune -a -f
                    '''
                }
            }
        }
    }

    post {
        success {
            slackSend(message: "UI build deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
        failure {
            slackSend(failOnError: true, message: "UI build failed  - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}