import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StudentSearchComponent} from "./components/student-search/student-search.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {StudentCreateComponent} from "./components/student-create/student-create.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
  {
    path: 'actions',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: StudentCreateComponent,
        canActivate: [AuthGuard]
        // canActivate: [AuthGuard, GeneralGuard]
      },
      // {path: 'edit/:id', component: DecisionFormComponent, canActivate: [AuthGuard, GeneralGuard]},
      {
        path: 'search',
        component: StudentSearchComponent
      },
      // {path: 'preview/:id', component: PreviewDocumentComponent},
    ]
  },
  {path: 'student-profile', component: StudentCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
