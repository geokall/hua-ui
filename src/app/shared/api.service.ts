import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtResponse} from "./models/jwt/jwt-response.interface";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {StudentDTO} from "./models/student-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<JwtResponse> {
    const url = `${environment.serverUrl}/auth/login`;
    return this.http.post<JwtResponse>(url, {username, password});
  }

  getAllStudents(): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${environment.serverUrl}/student/all`);
  }

  getStudent(id: number): Observable<StudentDTO> {
    return this.http.get<StudentDTO>(`${environment.serverUrl}/student/find/${id}`);
  }

  updateStudent(student: StudentDTO): Observable<StudentDTO> {
    return this.http.put<StudentDTO>(`${environment.serverUrl}/student/update/${student.id}`, student);
  }
}
