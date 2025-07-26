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

export default function BillList({ uid, onTotal }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "bills"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) =>
      setBills(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [uid]);

  const total = bills.reduce((sum, b) => sum + b.amount, 0);
  onTotal?.(total); // pass up to NetBar

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">
        Bills · <span className="text-yellow-400">${total}</span>
      </h2>
      <ul className="space-y-1">
        {bills.map((b) => (
          <li key={b.id} className="flex gap-2 items-center">
            <span className="flex-1">
              ${b.amount} – {b.label} (day {b.dueDay})
            </span>
            <button
              onClick={() => deleteDoc(doc(db, "bills", b.id))}
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
