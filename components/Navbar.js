'use client'

import React, { useState } from 'react'
import {useSession, signIn, signOut} from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const {data: session} = useSession()
    const [open, setOpen] = useState(true);
  return (
    <header className='px-4 py-8'>
        <div className='flex justify-between items-center max-w-screen-xl mx-auto shadow-md p-5'>
            <Link className='mr-4 font-extralight' href={'/'}>Task Create</Link>
            <Link className='mr-4 btn btn-primary' href={'/task'}>Add Task</Link>

            <div className='flex'>
                {session ? (
                    <>
                    <div className='flex items-center gap-3'>
                    <div  className="relative" data-open={open}>
                    <button onClick={() => setOpen(!open)} className="flex flex-row items-center  px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent">
                    <p className='mr-4 ' ><Image src={session?.user?.image} style={{width:"45px",height:"45px",borderRadius:"50%"}}/></p> 
                    </button>
                {open && (
                    <div className="absolute right-0  md:max-w-screen-sm md:w-28">
                    <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Add your anchor elements here */}
                        {/* Example: */}
                        <a href="#" >
                            
                            <div>
                                        <p>
                                        <button onClick={() => signOut()} className='btn btn-primary'>signOut</button>
                                        </p>
                            </div>
                        </a>
                        {/* Repeat the structure for other anchor elements */}
                        </div>
                    </div>
                    </div>
                )}
                </div>
                
                    </div>
                    </>
                ) : (
                    <>
                    <button onClick={() => signIn()} className='btn btn-primary'>SignIn</button>
                    </>
                )
                
                }
            </div>
        </div>
        
    </header>
  )
}

export default Navbar