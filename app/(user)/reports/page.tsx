"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getExpensesByCategory } from "@/services/expense.service";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface DataItem {
  _id: string; 
  total: number;
}

export default function ExpenseCategoryChart() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExpensesByCategory();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading chart...</p>;
  if (!data.length) return <p className="text-center mt-6">No data available</p>;

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
