import axios from 'axios';
import { stringify } from 'querystring';
export const maxDuration = 59;
export  async function GET(req, res) {
  console.log("@@@@@@@@@@@@@")
const urll = new URL(req.url);
 let url = urll.searchParams.get("url");
 if(url){

  console.log("@@@@@@@")
  try {
  
    const response = await axios.get(url);
    return new Response( "Website is Up",{status:200})
    
  } catch (error) {
    console.log(error)
    return new Response('Website is down' ,{status:500})
  
  }
 }else{

  return new Response(`No Url`,{status:500})
 }

  
}
