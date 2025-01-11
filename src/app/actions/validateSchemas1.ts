"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { schema1 } from "@/lib/zodSchema1";

interface FormErrors {
  name?: string[];
  lastName?: string[];
  email?: string[];
  password?: string[];
  _form?: string[];
}

interface FormState {
  errors: FormErrors;
}

// First argument must be prevState to match useFormState requirements
async function validateSchemas(prevState: FormState, formData: FormData) {
  const schemaData = {
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = schema1.safeParse(schemaData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    console.log('todo good mi compa');
    return { errors: {} };
  } catch(e) {
    if (e instanceof Error) {
      return { errors: { _form: [e.message] } };
    }
    return { errors: { _form: ["Something went wrong"] } };
  }
}

export default validateSchemas;