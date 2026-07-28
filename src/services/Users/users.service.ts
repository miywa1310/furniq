import { api } from "@/api";
import type { CreateUser, UpdateUser, User } from "./users.types";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (data: CreateUser): Promise<User> => {
  const res = await api.post("/users", data);
  return res.data;
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateUser;
}): Promise<User> => {
  const res = await api.patch<User>(`/users/${id}`, data);
  return res.data;
};
