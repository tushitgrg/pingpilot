import { EmailTemplate } from '@/components/email-template';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    if(!req.body)  return NextResponse.json({ "error":"errorrrrrr" });
    const body = await req.json();
    const {name,url,email} = body;
  
    const { data, error } = await resend.emails.send({
      from: 'Ping Pilot <alert@pingpilot.tushitgarg.com>',
      to: [`${email}`],
      subject: 'Urgent! Your Website is Down!',
      react: EmailTemplate({name,url}),
    });
console.log("hereeeeeeeeee")

const upsertedUser = await prisma.user.update({
    where: { email: email },
    data: { emailsent: true },
  });
      console.log( "!!Updated!!!",upsertedUser)


    return NextResponse.json("data");
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error :error, status: 500 });
  }
}
