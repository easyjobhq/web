"use client"

import React, { ChangeEvent, useState } from 'react'

function register() {

    const[name, setName] = useState("")
    const[lastName, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[phone, setPhone] = useState("")
    const[photo, setPhoto] = useState<File | null>(null)
    const[password, setPassword] = useState("")
    const [selectedOption, setSelectedOption] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setPhoto(event.target.files[0]);
        }
    };

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
            <input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-full shadow-inner p-4 border-0" type="text" name="last_name" placeholder="Perez"></input>
          </div>
          <div className="md:flex-1 md:pl-3">
            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full shadow-inner p-4 border-0" type="text" name="email" placeholder="pepitoperez@example.com"></input>
          </div>
        </div>
        <div className="md:flex mb-4">
          <div className="md:flex-1 md:pr-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Phone number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full shadow-inner p-4 border-0" type="phone" name="tel" placeholder="333 333 333"></input>
            </div>
            <div className="md:flex-1 md:pl-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Photo</label>
              <input onChange={handleFileChange} className="w-full shadow-inner p-4 border-0" type="file" name="photo" placeholder="-99.1405168"></input>
            </div>

          </div>
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-xs font-bold">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  className="w-full shadow-inner p-4 border-0" type="password" name="pass" placeholder="****"></input>
          </div>
          <div className="md:flex mb-4">

            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
            <select id="countries" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                  <option selected>Choose your purpose</option>
                  <option value="Prof">Professional</option>
                  <option value="Cli">Client</option>
            </select>
              
          </div>
          <input type="hidden" name="sponsor" value="0"></input>
            <button type="submit" className="text-cream-lighter bg-brick hover:bg-brick-dark">
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

export default register;