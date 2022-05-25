import {StudentGender} from "./student-gender-enum";

export interface StudentDTO {
  id?: number;
  surname?: string;
  name?: string;
  fatherName?: string;
  motherName?: string;
  birthDate?: string;
  gender?: StudentGender;

  department?: string;
  direction?: string;

  address?: string;
  city?: string;
  postalCode?: string;
  mobileNumber?: string;
  vatNumber?: string;
}
