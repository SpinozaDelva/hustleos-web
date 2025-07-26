import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function TaskList({ uid }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('uid', '==', uid),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snap) =>
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [uid]);

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={t.done}
            onChange={() =>
              updateDoc(doc(db, 'tasks', t.id), { done: !t.done })
            }
          />
          <span className={t.done ? 'line-through text-gray-400' : ''}>
            {t.title}
          </span>
          <button
            className="ml-auto text-xs text-red-600"
            onClick={() => deleteDoc(doc(db, 'tasks', t.id))}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}