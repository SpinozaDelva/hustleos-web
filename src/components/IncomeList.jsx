import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function IncomeList({ uid }) {
  const [incomes, setIncomes] = useState([]);

  // realtime listener for this user’s incomes
  useEffect(() => {
    const q = query(
      collection(db, "incomes"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) =>
      setIncomes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [uid]);

  // derive total on the fly
  const total = incomes.reduce((sum, inc) => sum + inc.amount, 0);

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">
        Income · <span className="text-green-400">${total}</span>
      </h2>

      <ul className="space-y-1">
        {incomes.map((inc) => (
          <li key={inc.id} className="flex gap-2 items-center">
            <span className="flex-1">
              ${inc.amount} – {inc.category}
            </span>
            <button
              onClick={() => deleteDoc(doc(db, "incomes", inc.id))}
              className="text-xs text-red-500"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
