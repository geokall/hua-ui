import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StudentDTO} from "../../shared/models/student-dto";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  createStudent(student: any): Observable<any> {
    const url = `${environment.serverUrl}/student/create`;
    return this.http.post(url, student);
  }

  getStudent(id: number): Observable<StudentDTO> {
    return this.http.get<StudentDTO>(`${environment.serverUrl}/student/find/${id}`);
  }
}
