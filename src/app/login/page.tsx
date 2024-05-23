"use client"

import { useLogin } from '@/hooks/auth/useLogin';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();
    const router = useRouter();
    const onSubmit = () => {
      if (!email || !password) {
        alert("Please enter information");
      } else {

        login(email, password)
          .then(() => router.push("/"))
          .catch((e: Error) => alert(e));
      }
    };
  
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="h-fit flex flex-col gap-2">
          <p className="text-2xl font-bold">Login Form</p>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 h-8 px-2 border border-solid border-black rounded"
            placeholder="email"
          />
          <label className="mt-4">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 h-8 px-2 border border-solid border-black rounded"
            placeholder="password"
            type="password"
          />
          <button
            onClick={onSubmit}
            className="h-10 w-80 mt-8 bg-black rounded text-white"
          >
            Login
          </button>
        </div>
      </div>
    );
}

export default Login