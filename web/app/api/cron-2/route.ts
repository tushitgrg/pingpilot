
import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;
export  async function GET(req, res) {
  
    let users = {data:[]}
    try{
       users = await axios.get("https://pingpilot.vercel.app/api/get-all");
    }catch{
      console.log("error")
    }
  console.log("lighthouse record!")
   for(let i=0; i<users.data.length;i++){
    
    try {
     const lighthouserecord = await axios.get(`https://pingpilot.vercel.app/api/lighthouse?id=${users.data[i].id}&url=${users.data[i].url}`)
      
     console.log("lighthouse record!")
     
    } catch (error) {
      console.error('Error in light:', );
     
    }
  
   
   }

   


return NextResponse.json("Done");

  
}
