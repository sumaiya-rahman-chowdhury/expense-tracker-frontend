import api from "@/lib/axios";

export const getExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data;
};

export const createExpense = async (data: {
  title: string;
  amount: number;
  category: string;
  date: string;
}) => {
  const res = await api.post("/expenses", data);
  return res.data;
};

export const updateExpense = async (
  id: string,
  data: { title?: string; amount?: number; category?: string ,date?: string}
) => {
  const res = await api.patch(`/expenses/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id: string) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};
export const getTotalExpenses = async () => {
  const res = await api.get("/expenses/total");
  return res.data.total; 
};
export const getExpensesByCategory = async () => {
  const res = await api.get("/expenses/stats/category");
  return res.data; 
};