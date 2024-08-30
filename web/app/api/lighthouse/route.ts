import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    const urll = new URL(req.url);
    let url = urll.searchParams.get("url");
   console.log("reached")

  if (!url) {
    return new Response("Error",{status:500})
  }




 let response = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${"AIzaSyCCD2vtZCR8aE8ALRwkv3ng4Xlai7zUcHY"}`)
let json = response.data;

  const lighthouse = json.lighthouseResult;
console.log(json.loadingExperience)
  
  return NextResponse.json({
   

      'First-Contentful-Paint': lighthouse.audits['first-contentful-paint']["displayValue"],

      'Speed-Index': lighthouse.audits['speed-index']["displayValue"],

      'Time-To-Interactive': lighthouse.audits['interactive']["displayValue"],
      'largest-contentful-paint-element': lighthouse.audits['largest-contentful-paint-element']["displayValue"],

   
     
      'total-blocking-time': lighthouse.audits['total-blocking-time']["displayValue"],
      'performance' : lighthouse.categories.performance.score,
    
  })





}