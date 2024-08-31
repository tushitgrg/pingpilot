
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';




export async function POST(req) {

    if(!req.body)  return NextResponse.json({ "error":"errorrrrrr" });
    const body = await req.json();
    const {email} = body;


    const upsertedUser = await prisma.user.update({
        where: {
          email: email, 
        },
        data: {
          emailsent: false, 
        }
       
      });
 return NextResponse.json(upsertedUser)
}
