import LoginPage from "@/components/LoginForms";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-extrabold text-gray-900">
          Expense Tracker
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Please <span className="font-semibold text-gray-800">login</span> to continue
        </p>

        <LoginPage />

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Page;
