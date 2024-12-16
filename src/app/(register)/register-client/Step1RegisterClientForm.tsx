import { useRegisterClientContext } from '@/context/RegisterClient';
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@/components/ui/Modal';

function Step1RegisterClientForm() {

    const {
        nextStep,
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword
    } = useRegisterClientContext();


    const [showPassword, setShowPassword] = React.useState(false);
    const [isError, setIsError] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleNextStep = () => {
        if (name && lastName && email && password) {
            nextStep();
        } else {
            setIsError(true);
        }
    }

    return (
        <>
            <div className="my-10">

                <p className='mb-5 text-base font-light text-gray-700'>Informacion Basica</p>
                <div className="mb-4">
                    <div className="md:flex md:space-x-4 md:space-y-0 mb-4 space-y-4 ">
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Nombre"
                            autoComplete="name"
                            fullWidth
                            required
                        />
                        <TextField
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            label="Apellido"
                            autoComplete="last-name"
                            fullWidth
                            required
                        />
                    </div>
                </div>
                <div className="w-full mb-4">
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        fullWidth
                        required
                        InputProps={{
                            classes: {
                                input: 'placeholder-gray-500'
                            }
                        }}
                    />
                </div>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Escribe tu contraseña'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    fullWidth
                    required
                    autoComplete='new-password'
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
            </div>
            <div className="w-full flex justify-end">

                <button
                    className='cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center p-4 rounded-md text-white font-bold'
                    onClick={handleNextStep}
                >
                    Siguiente
                </button>
            </div>
            <Modal isOpen={isError} onClose={() => setIsError(false)}>
                <div className="p-4 text-center mb-10">
                    <p className=" font-base">Por favor, rellena todos los campos del formulario</p>
                </div>
                <div className="flex items-center justify-center">

                    <button
                        className='cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center p-2 rounded-md text-white font-bold'
                        onClick={() => setIsError(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Step1RegisterClientForm