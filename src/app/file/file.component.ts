import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() isMinioFileExist: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  get getUsername() {
    return this.form.get('username') as FormControl;
  }

  get getFile() {
    return this.form.get('file') as FormGroup;
  }

  get getFileName() {
    return this.getFile.get('fileName') as FormControl;
  }

  get getActualFile() {
    return this.getFile.get('actualFile') as FormControl;
  }

  get getMimeType() {
    return this.getFile.get('mimeType') as FormControl;
  }

  redirectToMinio() {
    window.open('http://huademo.ddns.net:9001/buckets/' + this.getUsername?.value + '/browse');
  }

  onSelect(event: { files: any; }, fileName: string, whichFile: string) {
    console.log(this.form)
    for (let file of event.files) {
      this.getBase64(file).then(base64encoded => {
        let base64encodedString = base64encoded as string;
        let base64Format = base64encodedString.split(',')[1];
        this.getActualFile.setValue(base64Format);
        this.getFileName.setValue(file.name);
        this.getMimeType.setValue(file.type);
      })
    }
  }

  getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
