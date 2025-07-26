import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [pw,    setPw]    = useState('');
  const [isNew, setIsNew] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isNew) {
      await createUserWithEmailAndPassword(auth, email, pw);
    } else {
      await signInWithEmailAndPassword(auth, email, pw);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs mx-auto p-6">
      <input className="border p-2"  placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2"  placeholder="password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
      <button className="bg-blue-600 text-white py-2 rounded">{isNew ? 'Sign Up' : 'Sign In'}</button>
      <span onClick={()=>setIsNew(!isNew)} className="text-xs text-blue-400 cursor-pointer">
        {isNew ? 'Already registered? Sign in' : 'First time? Create account'}
      </span>
    </form>
  );
}