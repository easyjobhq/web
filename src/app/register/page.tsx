"use client"

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { useRegister } from '@/hooks/auth/useRegister'
import { uploadFile } from '@/firebase/config'

function Register() {

    const [name, setName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone] = useState("")
    const [photo, setPhoto] = useState<File | null>(null)
    const [photo_url,setPhotoUrl]= useState("")
    const [password, setPassword] = useState("")
    const [selectedOption, setSelectedOption] = useState('')
    const router = useRouter();
    const { register } = useRegister()

    

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
            const url = await uploadFile(event.target.files[0]).then((url)=>setPhotoUrl(url))
            //console.log(photo_url)
        }
    };

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!name || !last_name || !email || !phone_number || !password || !selectedOption) {
            alert("All fields are required");
        } else {
            if(photo!== null){
              console.log(photo_url)
              await register(name, last_name, email, phone_number, password, photo_url, selectedOption)
                .then(() => router.push("/"))
                .catch((e: Error) => alert(e));
            }else{
              await register(name, last_name, email, phone_number, password, "", selectedOption)
                .then(() => router.push("/"))
                .catch((e: Error) => alert(e));
            }
            
        }
    }

    return (
        <body className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
            <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
                <section className="bg-cream-lighter p-4 shadow">
                    <div className="md:flex">
                        <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Create your profile</h2>
                    </div>
                    <form>
                        <div className="md:flex mb-8">
                            <div className="md:w-1/3">
                                <legend className="uppercase tracking-wide text-sm">Basic information</legend>
                                <p className="text-xs font-light text-red">This entire section is required.</p>
                            </div>
                            <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                <div className="mb-4">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full shadow-inner p-4 border-0" type="text" name="name" placeholder="Pepito"></input>
                                </div>
                                <div className="md:flex mb-4">
                                    <div className="md:flex-1 md:pr-3">
                                        <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Last Name</label>
                                        <input value={last_name} onChange={(e) => setLastName(e.target.value)} className="w-full shadow-inner p-4 border-0" type="text" name="last_name" placeholder="Perez"></input>
                                    </div>
                                    <div className="md:flex-1 md:pl-3">
                                        <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full shadow-inner p-4 border-0" type="text" name="email" placeholder="pepitoperez@example.com"></input>
                                    </div>
                                </div>
                                <div className="md:flex mb-4">
                                    <div className="md:flex-1 md:pr-3">
                                        <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Phone number</label>
                                        <input value={phone_number} onChange={(e) => setPhone(e.target.value)} className="w-full shadow-inner p-4 border-0" type="tel" name="tel" placeholder="333 333 333"></input>
                                    </div>
                                    <div className="md:flex-1 md:pl-3">
                                        <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Photo</label>
                                        <input onChange={handleFileChange} className="w-full shadow-inner p-4 border-0" type="file" name="photo" placeholder="-99.1405168"></input>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full shadow-inner p-4 border-0" type="password" name="pass" placeholder="****"></input>
                                </div>
                                <div className="md:flex mb-4">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                                    <select id="countries" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="">Choose your purpose</option>
                                        <option value="Prof">Professional</option>
                                        <option value="Cli">Client</option>
                                    </select>
                                </div>
                                <button type="submit" className="text-cream-lighter bg-brick hover:bg-brick-dark" onClick={onSubmit}>
                                    Create profile
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </body>
    )
}

export default Register;
