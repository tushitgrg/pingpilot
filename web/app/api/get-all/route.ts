import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;
export  async function GET(req, res) {
  
 let  users =  await prisma.User.findMany();


return NextResponse.json(users);

  
}
