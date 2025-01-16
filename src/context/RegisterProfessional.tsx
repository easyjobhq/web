import { createContext, useContext, useState, ReactNode } from 'react';

interface RegisterProfessionalContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    photo: File | null;
    setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
    phoneNumber: string;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    cityId: string,
    setCityId: React.Dispatch<React.SetStateAction<string>>;
    cityName: string, 
    setCityName: React.Dispatch<React.SetStateAction<string>>;
    specialityId: string,
    setSpecialityId: React.Dispatch<React.SetStateAction<string>>;
    specialityName: string,
    setSpecialityName: React.Dispatch<React.SetStateAction<string>>;
    latitud: number,
    setLatitud: React.Dispatch<React.SetStateAction<number>>;
    longitud: number,
    setLongitud: React.Dispatch<React.SetStateAction<number>>;
}

interface RegisterProfessionalProviderProps {
    children: ReactNode;
}

const RegisterProfessionalContext = createContext<RegisterProfessionalContextType | null>(null);

export const useRegisterProfessionalContext = () => {

    const context = useContext(RegisterProfessionalContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const RegisterProfessionalProvider: React.FC<RegisterProfessionalProviderProps> = ({ children }) => {

    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => {
        if (prev > 1) {
            return prev - 1
        }
        return prev
    });


    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [cityId, setCityId] = useState<string>('');
    const [specialityId, setSpecialityId] = useState<string>('');
    const [cityName, setCityName] = useState<string>('');
    const [specialityName, setSpecialityName] = useState<string>('');
    const [latitud, setLatitud] = useState<number>(0);
    const [longitud, setLongitud] = useState<number>(0);

    return (
        <RegisterProfessionalContext.Provider
            value={{
                step,
                nextStep,
                prevStep,
                name,
                setName,
                lastName,
                setLastName,
                email,
                setEmail,
                password,
                setPassword,
                photo,
                setPhoto,
                phoneNumber,
                setPhoneNumber,
                cityId,
                setCityId,
                specialityId,
                setSpecialityId,
                cityName,
                setCityName,
                specialityName,
                setSpecialityName,
                latitud,
                setLatitud,
                longitud,
                setLongitud
            }}
        >
            {children}
        </RegisterProfessionalContext.Provider>
    );
};
