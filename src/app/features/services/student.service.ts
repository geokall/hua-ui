import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StudentDTO} from "../../shared/models/student-dto";
import {PasswordDTO} from "../../shared/models/password-dto";
import {StudentFileDTO} from "../../shared/models/student-file-dto";

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

  updatePassword(password: PasswordDTO): Observable<PasswordDTO> {
    return this.http.put<PasswordDTO>(`${environment.serverUrl}/student/update-password/${password.id}`, password);
  }

  getAllStudents(): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${environment.serverUrl}/student/all`);
  }

  updateStudent(student: StudentDTO): Observable<StudentDTO> {
    return this.http.put<StudentDTO>(`${environment.serverUrl}/student/update/${student.id}`, student);
  }

  getMinioFile(username: string): Observable<StudentFileDTO> {
    return this.http.get<StudentFileDTO>(`${environment.serverUrl}/student/minio-file/${username}`);
  }

  updateEventPassword(id: number): Observable<any> {
    return this.http.put<any>(`${environment.serverUrl}/student/event-password/${id}`, null);
  }

}
