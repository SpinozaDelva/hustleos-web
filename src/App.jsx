// src/App.jsx
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import Auth from "./components/Auth";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import IncomeList from "./components/IncomeList";
import IncomeForm from "./components/incomeform";
import NetBar from "./components/NetBar";
import BillForm from "./components/BillForm";
import BillList from "./components/BillList";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [billTotal,   setBillTotal]   = useState(0);

  if (loading) return <p className="text-center p-8">Loading…</p>;
  if (!user)    return <Auth />;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-red-500 text-3xl font-bold mb-4">HustleOS 🚀</h1>

      <TaskForm uid={user.uid} />
      <TaskList uid={user.uid} />

      {/* Income */}
      <IncomeForm uid={user.uid} />
      <IncomeList uid={user.uid} onTotal={setIncomeTotal} />

      {/* Bills */}
      <BillForm uid={user.uid} />
      <BillList uid={user.uid} onTotal={setBillTotal} />

      {/* Net balance */}
      <NetBar income={incomeTotal} bills={billTotal} />
    </div>
  );
}