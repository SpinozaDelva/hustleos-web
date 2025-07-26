import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';

import Header   from './components/Header';
import TabBar   from './components/TabBar';
import Card from './components/Card';

import Auth       from './components/Auth';
import TaskForm   from './components/TaskForm';
import TaskList   from './components/TaskList';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';
import BillForm   from './components/BillForm';
import BillList   from './components/BillList';
import NetBar     from './components/NetBar';

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [dark, setDark] = useState(false);
  const [tab, setTab]   = useState('tasks');
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [billTotal,   setBillTotal]   = useState(0);

  /* toggle hero image */
  if (!loading) {
    if (!user) {
      document.body.classList.add('bg-hero');
    } else {
      document.body.classList.remove('bg-hero');
    }
  }

  if (loading) return <p className="text-center p-8">Loading…</p>;
  if (!user)    return <Auth />;

  return (
    <div className={dark
        ? 'dark min-h-screen bg-gray-900 text-gray-100'
        : 'min-h-screen bg-gray-100 text-gray-900'}>

      <Header dark={dark} toggleDark={() => setDark(!dark)} />

      <main className="max-w-xl mx-auto p-4">
        <TabBar tab={tab} setTab={setTab} />

        {tab === 'tasks' && (
          <Card>
            <TaskForm uid={user.uid} />
            <TaskList uid={user.uid} />
          </Card>
        )}

        {tab === 'finance' && (
          <>
            <Card>
              <IncomeForm uid={user.uid} />
              <IncomeList uid={user.uid} onTotal={setIncomeTotal} />
            </Card>

            <Card>
              <BillForm uid={user.uid} />
              <BillList uid={user.uid} onTotal={setBillTotal} />
            </Card>

            <NetBar income={incomeTotal} bills={billTotal} />
          </>
        )}
      </main>
    </div>
  );
}