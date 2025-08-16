"use client";

import { useEffect, useState } from "react";
import { getExpenses, getTotalExpenses } from "@/services/expense.service";
import api from "@/lib/axios";
import Link from "next/link";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getExpenses();
        setExpenses(data);

        const totalAmount = await getTotalExpenses();
        setTotal(totalAmount);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((e) => e._id !== id));

      const totalAmount = await getTotalExpenses();
      setTotal(totalAmount);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const badgeColor = (category: string) => {
    switch (category) {
      case "Food":
        return "bg-green-100 text-green-700";
      case "Transport":
        return "bg-blue-100 text-blue-700";
      case "Shopping":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <p className="text-center mt-6">Loading expenses...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* Total Expense */}
      <h2 className="text-xl font-bold mb-4">
        Total Expense: <span className="text-red-500">${total.toFixed(2)}</span>
      </h2>

      {/* Expense Table */}
      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No expenses found.
              </td>
            </tr>
          )}

          {expenses.map((expense) => (
            <tr key={expense._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{expense.title}</td>
              <td className="p-3 font-medium">${expense.amount}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${badgeColor(
                    expense.category
                  )}`}
                >
                  {expense.category}
                </span>
              </td>
              <td className="p-3">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="p-3 flex justify-center gap-2">
                {/* Edit Button */}
                <Link
                  href={`/expenses/${expense._id}/edit`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
