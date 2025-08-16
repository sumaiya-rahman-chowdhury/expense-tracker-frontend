"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createExpense } from "@/services/expense.service";

const categories = ["Food", "Transport", "Shopping", "Others"] as const;

const expenseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.enum(categories, {
    message: "Please select a valid category",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please provide a valid date",
  }),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const AddExpenseForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await createExpense(data);
      alert("Expense added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6   mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Add Expense
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            {...register("category")}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
