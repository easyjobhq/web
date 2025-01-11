import {z} from 'zod';

const nameSchema = z.string().min(2).max(255);
const lastNameSchema = z.string().min(2).max(255);
const emailSchema = z.string().email('Email invalido');
const passwordSchema = z.string().min(8).max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,{message: 'La contraseña debe contener al menos una letra mayúscula, otra minúscula y un número'});

const phoneNumberSchema = z.string().regex(
    /^\+?[1-9]\d{1,14}$/,
    { message: "Invalid phone number. Please provide a valid international phone number." }
);

export const schema1 = z.object({
    name: nameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema
});

export const schema2 = z.object({
    phoneNumber: phoneNumberSchema
})
