"use client";
import {Button} from "@nextui-org/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation";



export default  function  LoginForm() {
    const [cuser, setCuser] = useState(null);
    const router = useRouter();

    const [url,seturl] = useState("");
    const [loading,setloading] = useState(false)
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await axios.get('https://pingpilot.vercel.app/api/current-user');
                if (response.data) {
                    setCuser(response.data);
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
                router.push('/');
            }
        };

        getCurrentUser();
    }, [router]);

   
    if (!cuser) return <p>Loading...</p>;

// if(!cuser.data) redirect('/')

    const handlesubmit = async ()=>{
        setloading(true)
       
        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

        let regex = new RegExp(expression)
        if(url.match(regex)){
 
            let response = await axios.get(`https://pingpilot.vercel.app/api/add-url?url=${url}`)
            toast({title:"Connected!"})
            router.push('/dashboard');
        }else{
            toast({title:"Check Your Url, Make sure http/https included with the url!"})
        }
        setloading(false)
      

    }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Add your Website</CardTitle>
        <CardDescription>
         Enter your website, with http/https
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="website">Website URL</Label>
          <Input id="website" type="url" value={url} onChange={(e)=>seturl(e.currentTarget.value)} placeholder="https://example.com" required />
        </div>
        
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlesubmit} type="submit" isLoading={loading} >Connect</Button>
       
      </CardFooter>
    </Card>
  )
}
