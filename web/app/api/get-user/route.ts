import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;
export  async function GET(req, res) {
    let cuser = await currentUser()
  if(!cuser) return new Response(null);
 let  users =  await prisma.User.findUnique({

    where: {
        email: cuser.emailAddresses[0].emailAddress, // Unique field to check
      },
 });


return NextResponse.json(users);

  
}
