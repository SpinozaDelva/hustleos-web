import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function IncomeForm({ uid }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('freelance');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount) return;

    await addDoc(collection(db, 'incomes'), {
      uid,
      amount: Number(amount),
      category,
      createdAt: serverTimestamp(),
    });

    setAmount('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="number"
        className="border p-2 w-24"
        placeholder="$"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <select
        className="border p-2"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="freelance">Freelance</option>
        <option value="paycheck">Paycheck</option>
        <option value="other">Other</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}