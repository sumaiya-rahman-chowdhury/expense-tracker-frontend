import api from "@/lib/axios";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};
