import { SignIn } from '@clerk/nextjs'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from 'next/image';
export default function Page() {
  return <div className='flex justify-center align-middle'>
    <CardContainer className="inter-var">
    <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          <SignIn />
          </CardItem>
   
</CardContainer>
   
   </div>
}