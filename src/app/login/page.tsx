"use client"

import { useLogin } from '@/hooks/auth/useLogin';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsTools } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { useGlobalContext } from '@/context/store';
import { authService } from '@/services';
import { Client } from '@/interfaces/Client';


function Login() {

  const { userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const router = useRouter();

  const handleOauth = async (event: any) => {
    event.preventDefault();

    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`;

  };

  const onSubmit = async () => {
    if (!email || !password) {
      alert("Please enter information");
    } else {

      const loginResponse = await login(email, password)
        .catch((e: Error) => alert(e));

      setUserIdContext(loginResponse.id);
      setEmailContext(loginResponse.email);
      const user: Client | any = await authService.getMe(loginResponse.id);
      setUsernameContext(user.name + " " + user.last_name)

      router.push("/home")

    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-500">
      <div className="flex flex-col border px-10 pb-10 pt-7 rounded-md shadow-md bg-white">
        <div className="font-bold flex mb-5 text-center justify-center items-center" style={{ fontSize: "1.8rem" }}><p>Iniciar Sesión</p></div>
        <label className=' text-left mb-2 font-medium'>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-9 px-3 border border-solid border-black rounded"
          placeholder="Email"
        />
        <label className="mt-4 text-left mb-2 font-medium">Constraseña</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-9 px-2 border border-solid border-black rounded"
          placeholder="Constraseña"
          type="password"
        />
        <button
          onClick={onSubmit}
          className="h-10 w-full mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg"
        >
          Iniciar sesión
        </button>
        <button
          onClick={handleOauth}
          className="h-10 w-full mt-5 bg-blue-500 rounded flex items-center justify-center text-white font-medium border-blue-600 border text-lg"
        >
          <FaGoogle className='mr-2' /><p>Conectate con Google</p>
        </button>
        <div className="flex items-center justify-center">
          <p className='text-sm font-light mt-4 mr-1'>¿No tienes cuenta?</p>
          <Link href={"/register"} className='text-sm font-normal mt-4 text-center text-blue-700 hover:underline'> Registrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login
