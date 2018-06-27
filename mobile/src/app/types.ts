export type School = {
  _id: string;
  address?: string;
  cep?: string;
  city?: string;
  code?: string;
  name: string;
  telephone?: string;
  type?: string;
}

export type User = {
  name: string;
  idSchool: string;
  email: string;
  uid: string;
}

export interface LoggedUser extends User {
  school: School;
}
