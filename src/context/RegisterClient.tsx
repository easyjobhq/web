import { createContext, useContext, useState, ReactNode } from 'react';

interface RegisterClientContextType {
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
}

interface RegisterClientProviderProps {
    children: ReactNode;
}

const RegisterClientContext = createContext<RegisterClientContextType | null>(null);

export const useRegisterClientContext = () => {

    const context = useContext(RegisterClientContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const RegisterClientProvider: React.FC<RegisterClientProviderProps> = ({ children }) => {

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

    return (
        <RegisterClientContext.Provider
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
                setPhoneNumber
            }}
        >
            {children}
        </RegisterClientContext.Provider>
    );
};
