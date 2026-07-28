export interface User {
  id: string;
  phone: string;

  firstName?: string;
  lastName?: string;
  middleName?: string;

  email?: string;
  gender?: "male" | "female";
  birthDate?: string;

  address?: string;
}

export type UpdateUser = {
  birthDate?: string | null;
  firstName?: string;
  lastName?: string;
  middleName?: string | undefined;
  email?: string | undefined;
  phone?: string;
  gender?: "male" | "female" | undefined;
};

export type CreateUser = {
  firstName?: string;
  lastName?: string;

  email?: string;

  phone: string;

  password?: string;

  gender?: "male" | "female";

  birthDate?: string | null;
};
