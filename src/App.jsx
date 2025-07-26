// src/App.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import Auth from "./components/Auth";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-center p-8">Loading…</p>;
  if (!user) return <Auth />;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-red-500 text-3xl font-bold mb-4">HustleOS 🚀</h1>
      <TaskForm uid={user.uid} />
      <TaskList uid={user.uid} />
    </div>
  );
}
