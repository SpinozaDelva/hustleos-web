import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function BillForm({ uid }) {
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [dueDay, setDueDay] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !label || !dueDay) return;

    await addDoc(collection(db, "bills"), {
      uid,
      amount: Number(amount),
      label,
      dueDay: Number(dueDay), // 1‑31
      createdAt: serverTimestamp(),
    });

    setAmount("");
    setLabel("");
    setDueDay("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-center">
      <input
        type="number"
        className="border p-2 w-24"
        placeholder="$"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="border p-2 flex-1"
        placeholder="label (rent, wifi…)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-16"
        placeholder="day"
        min="1"
        max="31"
        value={dueDay}
        onChange={(e) => setDueDay(e.target.value)}
      />
      <button className="bg-yellow-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
