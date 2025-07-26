export default function NetBar({ income, bills }) {
  const net = income - bills;
  const color = net >= 0 ? 'text-green-400' : 'text-red-500';
  return (
    <p className={`font-semibold mt-4 ${color}`}>
      Net$ {net}
    </p>
  );
}
