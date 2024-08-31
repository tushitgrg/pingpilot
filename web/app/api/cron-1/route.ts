
import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;
export  async function GET(req, res) {
  
    const users = await axios.get("https://pingpilot.vercel.app/api/get-all");

    for(let i=0; i<users.data.length;i++){
     let status = false;
     try {
       
       const response = await axios.get(`${users.data[i].url}`);
       
       console.error('Website up:');
       status = true;
       if(users.data[i].emailsent){
         axios.post('https://pingpilot.vercel.app/api/web-up', {
          
           email: users.data[i].email
         }, {
           headers: {
             'Content-Type': 'application/json'
           }
         });
       }
     } catch (error) {
       if(users.data[i].emailsent) return
       console.error('website down:', error);
   
       axios.post('https://pingpilot.vercel.app/api/sendalert', {
         name: users.data[i].name,
         url: users.data[i].url,
         email: users.data[i].email
       }, {
         headers: {
           'Content-Type': 'application/json'
         }
       });
       
       status = false;
       const uptimerecord = await axios.get(`https://pingpilot.vercel.app/api/add-uptime?id=${users.data[i].id}&status=${status}`)
     }
   
     
    }


return NextResponse.json("Done");

  
}
