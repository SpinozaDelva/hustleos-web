export default function TabBar({ tab, setTab }) {
  const base = "flex-1 text-center py-2 cursor-pointer rounded-t-xl";
  const active = "bg-surface text-white";
  const inactive = "bg-gray-200 dark:bg-gray-700 text-gray-500";

  return (
    <nav className="flex mt-4">
      <div className={`${base} ${tab==='tasks'?active:inactive}`} onClick={()=>setTab('tasks')}>
        Tasks
      </div>
      <div className={`${base} ${tab==='finance'?active:inactive}`} onClick={()=>setTab('finance')}>
        Finance
      </div>
    </nav>
  );
}
