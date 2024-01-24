import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [stats, setStats] = useState(null);
    const {data: session} = useSession()
    useEffect(() => {
        axios.get("/api/task").then((response) => {
            setStats(response.data)
        })
    }, [])
    console.log(stats);
  return (
    <div className='flex p-3 gap-3 w-full flex-wrap' style={{maxWidth:"1300px",margin:"0 auto"}}> 
    {
      stats?.map((item,index)=>(
        <div className=" flex  flex-col gap-4 items-center flex-wrap " key={index}>

        <a href="#" className=" border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50" style={{transition:"1s all"}}>
  
          <p className="bg-sky-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl"> {session?.user?.name} </p>
  
          <div className="grid grid-cols-6 p-5 gap-y-2">
  
            <div>
              <Image src={session?.user?.image} className=" max-h-16 rounded-full" alt='assa' />
            </div>
  
            <div className="col-span-5 md:col-span-4 ml-4">
  
              <p className="text-sky-500 font-bold text-xs"> {item?.title}</p>
  
              <p className="text-gray-600 font-bold"> {item?.desc} </p>
              <p className="text-gray-400"> {item?.status} </p>
  
            </div>
  
           
  
          </div>
  
        </a>
  
  
  
  </div>
      ))
    }
        
    </div>
  )
}

export default Home