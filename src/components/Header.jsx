import { Sun, Moon } from 'lucide-react';     // npm i lucide-react

export default function Header({ dark, toggleDark }) {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary p-4 rounded-b-2xl shadow-lg flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold tracking-wide flex items-center gap-2">
        HustleOS <span>🚀</span>
      </h1>
      <button onClick={toggleDark} className="text-white">
        {dark ? <Sun size={20}/> : <Moon size={20}/>}
      </button>
    </header>
  );
}
