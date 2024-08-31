import prisma from '@/lib/prisma';
import axios from 'axios';
import { NextResponse } from 'next/server';
export const maxDuration = 59;
export async function GET(req, res) {
    const urll = new URL(req.url);
    let url = urll.searchParams.get("url");
   console.log("reached")
   let id = urll.searchParams.get("id");
  if (!url && !id) {
    return new Response("Error",{status:500})
  }




 let response = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${"AIzaSyCCD2vtZCR8aE8ALRwkv3ng4Xlai7zUcHY"}`)
let json = response.data;

  const lighthouse = json.lighthouseResult;
console.log(json.loadingExperience)
  

let  us =  await prisma.lighthouse.create({
  data: {
    firstContentfulPaint : lighthouse.audits['first-contentful-paint']["displayValue"],
    speedIndex : lighthouse.audits['speed-index']["displayValue"],
    timeToInteractive : lighthouse.audits['interactive']["displayValue"],
    largestContentfulPaint : lighthouse.audits['largest-contentful-paint-element']["displayValue"],
    totalBlockingTime : lighthouse.audits['total-blocking-time']["displayValue"],
    performance :  `${lighthouse.categories.performance.score}` ,
      user: {
        connect: { id: id }, 
      },
    },
})
  return NextResponse.json({
   

      'First-Contentful-Paint': lighthouse.audits['first-contentful-paint']["displayValue"],

      'Speed-Index': lighthouse.audits['speed-index']["displayValue"],

      'Time-To-Interactive': lighthouse.audits['interactive']["displayValue"],
      'largest-contentful-paint-element': lighthouse.audits['largest-contentful-paint-element']["displayValue"],

   
     
      'total-blocking-time': lighthouse.audits['total-blocking-time']["displayValue"],
      'performance' : lighthouse.categories.performance.score,
    
  })





}