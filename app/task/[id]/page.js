'use client'

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useSession} from "next-auth/react"

const SingleTask = (ctx) => {    
    const [task, setTask] = useState(null)
    const router = useRouter()
    const {data: session, status} = useSession()

    const fetchData = (taskId)=> {
        axios.get(`/api/task/${taskId}`)
        .then((response) => {
            setTask(response.data)
        })
        .catch((error) => {
            console.error("Error", error)
        })
    }
    useEffect(() => {
        if(status === 'authenticated'){
            fetchData(ctx.params.id)
        }
    }, [ctx.params.id, status])

    if(status !== 'authenticated'){
        return <p className='text-center'>Not Authorized</p>
    }

    const handleDeleteTask = () => {
        axios.delete(`/api/task/${ctx.params.id}`)
        .then(() => {
            router.push('/task')
        })
        .catch((error) => {
            console.error("Error", error)
        })
    }
    if(!task){
        return <p className='text-center'>Loading Task....</p>
    }
  return (
    <section className='px-4 py-8 max-w-screen-xl mx-auto'>
        <h2 className='font-light'>Single Task</h2>
        <table className='w-full border-collapse mt-4'>
        <thead>
            <tr>
                <th className='border border-gray-300'>Title</th>
                <th className='border border-gray-300'>Description</th>
                <th className='border border-gray-300'>Status</th>
                <th className='border border-gray-300'>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr key={task._id}>
                <td className='border border-gray-300 text-center py-2'>{task.title}</td>
                <td className='border border-gray-300 text-center py-2'>{task.desc}</td>
                <td className='border border-gray-300 text-center py-2'>{task.status}</td>
                <td className='border border-gray-300 text-center py-2 flex flex-wrap justify-center gap-2'>
                <Link
                href={`/task/edit/${ctx.params.id}`}
                className="btn btn-secondary"
                >
                    Edit
                </Link>
                <button
                onClick={handleDeleteTask}
                className="btn btn-success"
                >
                    Delete
                </button>
                </td>
            </tr>
        </tbody>
        </table>
    </section>
  )
}

export default SingleTask