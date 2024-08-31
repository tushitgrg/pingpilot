import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;
export  async function GET(req, res) {
    
  console.log("@@@@@@@@@@@@@")

const urll = new URL(req.url);
 let id = urll.searchParams.get("id");
 let status = urll.searchParams.get("status");

 if(!id || !status)    return new Response("No id")
 let  us =  await prisma.uptime.create({
    data: {
        status: (status.toLowerCase()==="true"),
        user: {
          connect: { id: id }, 
        },
      },
})


return NextResponse.json(us);

  
}
