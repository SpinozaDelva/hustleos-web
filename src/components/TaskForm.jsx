import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function TaskForm({ uid }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await addDoc(collection(db, "tasks"), {
      title,
      uid, // <‑‑ keep track of owner
      done: false,
      createdAt: serverTimestamp(),
    });

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 border p-2 rounded"
        placeholder="New task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 rounded">Add</button>
    </form>
  );
}
