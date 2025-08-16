"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateExpense } from "@/services/expense.service";
import api from "@/lib/axios";
interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}
interface PageProps {
  params: Promise<{ id: string }>;
}
const categories = ["Food", "Transport", "Shopping", "Others"];
export default function EditExpensePage({ params }: PageProps) {
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      setId(id);
    };
    resolveParams();
  }, [params]);
  useEffect(() => {
    if (!id) return;
    const fetchExpense = async () => {
      try {
        const res = await api.get(`/expenses/${id}`);
        setExpense(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load expense");
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense || !id) return;

    try {
      await updateExpense(id, {
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      });
      alert("Expense updated successfully!");
      router.push("/list-view");
    } catch (err) {
      console.error(err);
      alert("Failed to update expense");
    }
  };

  if (loading || !id) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!expense) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 text-gray-700">Amount</label>
          <input
            type="number"
            value={expense.amount}
            onChange={(e) =>
              setExpense({ ...expense, amount: Number(e.target.value) })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-gray-700">Category</label>
          <select
            value={expense.category}
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 text-gray-700">Date</label>
          <input
            type="date"
            value={expense.date.split("T")[0]}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
}