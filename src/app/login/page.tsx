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
      const token = window.location.href = `https://easy-job-eyze.onrender.com/auth/google/callback`;
      //console.log("token de la pagina " + token)
    };
    const onSubmit = async () => {
      if (!email || !password) {
        alert("Please enter information");
      } else {

        const loginResponse = await login(email, password)
          .catch((e: Error) => alert(e));

        setUserIdContext(loginResponse.id);
        setEmailContext(loginResponse.email);
        const user: Client | any  = await authService.getMe(loginResponse.id);
        setUsernameContext( user.name + " " + user.last_name)
        
        router.push("/home")
        
      }
    };
  
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="h-fit w-2/5">
          <div className=" flex items-center w-auto justify-center">
          <div className="flex flex-col border px-10 pb-10 pt-7 rounded-md shadow-md bg-white">
              <div className="font-bold flex mb-5 text-center justify-center items-center" style={{fontSize: "1.8rem"}}><p>Iniciar Sesión</p> <BsTools className='ml-3'/></div>
                <label className=' text-left mb-2 font-medium'>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-80 h-9 px-3 border border-solid border-black rounded"
                  placeholder="Email"
                />
                <label className="mt-4 text-left mb-2 font-medium">Constraseña</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-80 h-9 px-2 border border-solid border-black rounded"
                  placeholder="Constraseña"
                  type="password"
                />
                <button
                  onClick={onSubmit}
                  className="h-10 w-80 mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={handleOauth}
                  className="h-10 w-80 mt-5 bg-blue-500 rounded flex items-center justify-center text-white font-medium border-blue-600 border text-lg"
                >
                  <FaGoogle className='mr-2' /><p>Conectate con Google</p> 
                </button>
                <Link href={"/register"} className='text-sm font-normal mt-4 text-center text-blue-700 hover:underline'>¿No tienes cuenta? Registrate</Link>
              </div>
          </div>
        </div>
        <div className='w-3/5 bg-blue-500 h-full flex justify-center align-middle items-center'>
          <div>
            <h1 className='text-5xl text-white font-bold mb-3 flex items-center justify-center'>Easy Job <BsTools className='ml-3'/></h1>
            <h5 className='text-white font-medium text-center mb-3'>"Encuentra tu profesional facilmente por internet"</h5>
            <Image 
            src={'/Easy-job-logo.png'} 
            alt={'Easy job logo'}
            width={600}
            height={600}
            className='opacity-85'>
            </Image>
            
          </div>
        </div>
      </div>
    );
}

export default Login