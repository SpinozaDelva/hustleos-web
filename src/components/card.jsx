export function Card({ children }) {
  return (
    <div className="bg-white dark:bg-surface/60 backdrop-blur rounded-xl shadow p-4 mt-4">
      {children}
    </div>
  );
}
