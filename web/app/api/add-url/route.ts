import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;
export  async function GET(req, res) {
    

  let user = await currentUser()
const urll = new URL(req.url);
 let url = urll.searchParams.get("url");
if(!user) return new Response("Authentication needed")
 if(!url)    return new Response("No Url")

    const upsertedUser = await prisma.user.upsert({
        where: {
          email: user.emailAddresses[0].emailAddress, // Unique field to check
        },
        update: {
          url: url, // Update the `url` field if the record already exists
        },
        create: {
          name: user.firstName, // Create a new record with these values if the email does not exist
          email: user.emailAddresses[0].emailAddress,
          url: url,
        },
      });
let status;
      try {
        const response = await axios.get(`${upsertedUser.url}`);
        
        console.error('Website up:');
        status = true;
      } catch (error) {
        console.error('website down:', error);
        status = false;
        const uptimerecord = await axios.get(`https://pingpilot.vercel.app/api/add-uptime?id=${upsertedUser.id}&status=${status}`)
      }
      const lighthouserecord = await axios.get(`https://pingpilot.vercel.app/api/lighthouse?id=${upsertedUser.id}&url=${upsertedUser.url}`)
return NextResponse.json(user);

  
}
