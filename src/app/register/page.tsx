"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRegister } from '@/hooks/auth/useRegister';
import { uploadFile } from '@/firebase/config';
import { City } from '@/interfaces/city';
import { Service } from '@/interfaces/service';
import { Language } from '@/interfaces/language';
import { Speciality } from '@/interfaces/speciality';
import { authService } from '@/services';

function Register() {
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photo_url, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [cityId, setCityId] = useState('');
    const [languageId, setLanguageId] = useState('');
    const [specialityId, setSpecialityId] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const router = useRouter();
    const { register } = useRegister();

    useEffect(() => {
        const fetchData = async () => {
            const services = await authService.getServices();
            setServices(services);
            
            const languages = await authService.getLanguage();
            setLanguages(languages);

            const cities = await authService.getCity();
            setCities(cities);

            const specialities = await authService.getSpeciality();
            setSpecialities(specialities);
        };
        
        fetchData();
    }, []);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (typeof window !== 'undefined') {
            if (event.target.files && event.target.files.length > 0) {
                setPhoto(event.target.files[0]);
                const url = await uploadFile(event.target.files[0]);
                setPhotoUrl(url);
            }
        }
    };

    const onSubmit = async () => {
        if (!name || !last_name || !email || !phone_number || !password || !selectedOption) {
            alert("All fields are required");
            return;
        }
        
        try {
            if (selectedOption === 'Prof' && (!serviceId || !cityId || !languageId || !specialityId)) {
                alert("All fields are required");
                return;
            }
            
            if (selectedOption === 'Cli') {
                await register(name, last_name, email, phone_number, password, photo_url, "", "", "", "", selectedOption);
            } else {
                await register(name, last_name, email, phone_number, password, photo_url, serviceId, languageId, cityId, specialityId, selectedOption);
            }
            
            router.push("/login");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
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
                                        <input onChange={handleFileChange} className="w-full shadow-inner p-4 border-0" type="file" name="photo"></input>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full shadow-inner p-4 border-0" type="password" name="pass" placeholder="****"></input>
                                </div>
                                <div className="md:flex mb-4">
                                    <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                                    <select id="countries" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="">Choose your purpose</option>
                                        <option value="Prof">Professional</option>
                                        <option value="Cli">Client</option>
                                    </select>
                                </div>
                                {selectedOption === "Prof" && (
                                    <>
                                        <div className="md:flex mb-4">
                                            <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a service</label>
                                            <select
                                                id="services"
                                                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={serviceId}
                                                onChange={(e) => setServiceId(e.target.value)}
                                            >
                                                <option value="">Choose your service</option>
                                                {services.map(service => (
                                                    <option key={service.id} value={service.id}>
                                                        {service.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a city</label>
                                            <select
                                                id="cities"
                                                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={cityId}
                                                onChange={(e) => setCityId(e.target.value)}
                                            >
                                                <option value="">Choose your city</option>
                                                {cities.map(city => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.city_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a language</label>
                                            <select
                                                id="languages"
                                                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={languageId}
                                                onChange={(e) => setLanguageId(e.target.value)}
                                            >
                                                <option value="">Choose your language</option>
                                                {languages.map(language => (
                                                    <option key={language.id} value={language.id}>
                                                        {language.language_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <label htmlFor="speciality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a speciality</label>
                                            <select
                                                id="specialities"
                                                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={specialityId}
                                                onChange={(e) => setSpecialityId(e.target.value)}
                                            >
                                                <option value="">Choose your speciality</option>
                                                {specialities.map(speciality => (
                                                    <option key={speciality.id} value={speciality.id}>
                                                        {speciality.speciality_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                                <div className="md:flex mb-4">
                                    <button type="submit" onClick={()=>onSubmit} className="bg-purple text-white font-bold uppercase text-lg mx-auto p-4 rounded">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Register;
