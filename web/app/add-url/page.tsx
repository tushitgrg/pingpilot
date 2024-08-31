
import React from 'react'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

const Page = async () => {
let user =  await currentUser()
console.log(user);

 const handlesubmit=(e)=>{
    e.preventDefault()
    // let val = prisma.User.create({data:{

    // }})
 }
  return (
    <div>
<input type="text" />
{/* <button onClick={handlesubmit} type='submit'>submit</button> */}
    </div>
  )
}

export default Page