"use client"

import { useLogin } from '@/hooks/auth/useLogin';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { useGlobalContext } from '@/context/store';
import { authService } from '@/services';
import { Client } from '@/interfaces/Client';
import Footer from '../(general)/Footer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BackgroundBeams } from "@/components/ui/background-beams";
import Modal from '@/components/ui/Modal';
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import DynamicIcon from '@/components/ui/icons/DynamicIcon';

function Login() {

  const { userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const router = useRouter();


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOauth = async (event: any) => {
    event.preventDefault();

    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`;

  };

  const [hasLoginFailed, setHasLoginFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async () => {
    if (!email || !password) {
      setHasLoginFailed(true);
      setErrorMessage("Tienes que llenar todos los campos");
    } else {

      console.log(email)
      console.log(password)

      const loginResponse = await login(email, password)
        .catch((e: Error) => {
          setHasLoginFailed(true)
          setErrorMessage("⚠️ Las credenciales ingresadas no son correctas. Por favor, verifica tu usuario y contraseña e inténtalo nuevamente 🔄");
        });

      setUserIdContext(loginResponse.id);
      setEmailContext(loginResponse.email);
      const user: Client | any = await authService.getMe(loginResponse.id);
      setUsernameContext(user.name + " " + user.last_name)

      router.push("/home")

    }
  };

  return (

    <div className='relative antialiased'>
      <div className='mx-auto'>
        <nav className="flex bg-blue-500 w-full py-4 items-center px-5 md:px-[10%] lg:px-[15%]">
          <Link href={"/"} className="flex z-10">
            <Image src="/EasyJob-logo-white.png" alt="EasyJob logo" width={25} height={25} layout="intrinsic" className="w-7 h-7 mr-3 object-fill flex-grow-0 self-center" />
            <h2 className="text-white text-2xl font-bold">Easy Job</h2>
          </Link>
        </nav>
        <div className="w-screen h-[90vh] flex items-center justify-center bg-slate-100">
          <div className="z-10 flex flex-col border w-full max-w-md px-10 pb-10 pt-7 rounded-md shadow-md bg-white">
            <div className="font-bold flex mb-5 text-center justify-center items-center" style={{ fontSize: "1.8rem" }}><p>Iniciar Sesión</p></div>
            <FormControl fullWidth margin='normal'>
              <label className='text-sm mb-2'>Correo Electronico</label>
              <TextField
                id="outlined-username"
                placeholder='juan@gmail.com'
                value={email} // Controlled input
                onChange={(event) => setEmail(event.target.value)} // Update state on input change
              />
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <label className='text-sm'>Contraseña</label>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                placeholder='Escribe tu contraseña'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <button
              onClick={onSubmit}
              className="z-10 w-full mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg p-2"
            >
              Iniciar sesión
            </button>
            <button
              onClick={handleOauth}
              className="z-10 w-full p-2 mt-5 bg-[#FDE047] rounded flex items-center justify-center text-black font-light border border-[#c9b137] text-lg"
            >
              <FaGoogle className='mr-2' /><p>Conectate con Google</p>
            </button>

            <div className="flex items-center justify-center">
              <Link href={"/password-change"} className='z-10 text-sm font-normal mt-4 text-center text-blue-700 hover:underline'>¿Olvidaste tu contraseña?</Link>
            </div>

            <div className='mt-10 h-[2px] bg-slate-200 w-full'></div>
            <div className="flex items-center justify-center">
              <p className='text-sm font-light mt-4 mr-1'>¿No tienes cuenta?</p>
              <Link href={"/register-client"} className='z-10 text-sm font-normal mt-4 text-center text-blue-700 hover:underline'> Registrate</Link>
            </div>
          </div>

        </div>
        <Modal isOpen={hasLoginFailed} onClose={() => {
          setEmail('')
          setPassword('')
          setHasLoginFailed(false)
        }} >
          <p>{errorMessage}</p>
          <button
            onClick={() => {
              setEmail('')
              setPassword('')
              setHasLoginFailed(false)
            }}
            className="z-10 h-10 w-full mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg"
          >
            Aceptar
          </button>
        </Modal>

        <Footer />
      </div>

      <BackgroundBeams />

    </div>


  );
}

export default Login
