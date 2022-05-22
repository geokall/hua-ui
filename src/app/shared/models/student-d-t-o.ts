import {StudentGender} from "./student-gender";
import {StudentDetailsDTO} from "./student-details-d-t-o";
import {StudentContactInfoDTO} from "./student-contact-info-dto";

export interface StudentDTO {
  id?: number;
  surname?: string;
  name?: string;
  fatherName?: string;
  motherName?: string;
  birthDate?: string;
  gender?: StudentGender
  studentDetails?: StudentDetailsDTO
  studentContactInfo?: StudentContactInfoDTO
}
