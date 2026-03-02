import api from "./axios";

interface SyncUserData {
  email: string;
  name: string;
}

export const syncUser = async (userData: SyncUserData) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};
