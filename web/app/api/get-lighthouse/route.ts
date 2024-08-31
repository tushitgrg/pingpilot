import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';

const extractNumber = (value) => {
    console.log(`${value} !!!! ${parseFloat(value.replace(/,/g, '').match(/[\d.]+/))}`)
    return parseFloat(value.replace(/,/g, '').match(/[\d.]+/));
   
  };
function calculateFCPScore(fcp) {
    if (fcp <= 1.8) return 100;
    if (fcp <= 3.0) return 100 - (50 * (fcp - 1.8) / 1.2);
    return 50 - (50 * (fcp - 3.0) / 3.0);
}

function calculateLCPScore(lcp) {
    if (lcp <= 2500) return 100;
    if (lcp <= 4000) return 100 - (50 * (lcp - 2500) / 1500);
    return 50 - (50 * (lcp - 4000) / 2000);
}

function calculateTTIScore(tti) {
    if (tti <= 3.8) return 100;
    if (tti <= 7.3) return 100 - (50 * (tti - 3.8) / 3.5);
    return 50 - (50 * (tti - 7.3) / 7.3);
}

function calculateSIScore(si) {
    if (si <= 4.3) return 100;
    if (si <= 5.8) return 100 - (50 * (si - 4.3) / 1.5);
    return 50 - (50 * (si - 5.8) / 5.8);
}

function calculateTBTScore(tbt) {
    if (tbt <= 200) return 100;
    if (tbt <= 600) return 100 - (50 * (tbt - 200) / 400);
    return 50 - (50 * (tbt - 600) / 600);
}

export const maxDuration = 59;
export  async function GET(req, res) {
    let cuser = await currentUser()
  if(!cuser) return new Response(null);
  let  users =  await prisma.User.findUnique({

    where: {
        email: cuser.emailAddresses[0].emailAddress, // Unique field to check
      },
 });

 let  lighthouserep =  await prisma.Lighthouse.findFirst({

    where: {
        authorId: users.id, 
      },
      orderBy: {
        createdAt: 'desc',
    }
 });
 let  lighthouseall =  await prisma.Lighthouse.findMany({

    where: {
        authorId: users.id, 
      },
      take: 10,

 });

 let totalperformance = 0;
 let allperformances = []
 for(let i=0;i<lighthouseall.length;i++){
totalperformance = totalperformance + lighthouseall[i].performance*100;
const datetime = new Date(lighthouseall[i].createdAt)
allperformances.push({
    date: datetime.toISOString().split('T')[0],
    performance:lighthouseall[i].performance*100
})
 }
const lighthousevalues = {
    firstContentfulPaint : calculateFCPScore(extractNumber(lighthouserep.firstContentfulPaint)) - 3,
    speedIndex : calculateSIScore(extractNumber(lighthouserep.speedIndex)) - 2,
    timeToInteractive : calculateTTIScore(extractNumber(lighthouserep.timeToInteractive))-5,
    largestContentfulPaint : calculateLCPScore(extractNumber(lighthouserep.largestContentfulPaint))-5,
    totalBlockingTime : calculateTBTScore(extractNumber(lighthouserep.totalBlockingTime))-7
}

const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

const alluptimerecs =    await prisma.Uptime.findMany({

    where: {
        createdAt: {
          gte: sevenDaysAgo,
          lte: today
        },
        authorId: users.id, 
      },
      orderBy: {
        createdAt: 'desc',
    }

 });

//  
//  counts[today.toISOString().split('T')[0]] = 0;
//  alluptimerecs.forEach(record => {
//     const date = new Date(record.createdAt);
//     const day = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

//     if (counts[day]) {
//       counts[day]++;
//     } else {
//       counts[day] = 1;
//     }
//   });

const counts = {};

for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(today.getDate() - i);
  const formattedDate = date.toISOString().split('T')[0];
  counts[formattedDate] = 0;
}

// Populate counts with actual data
alluptimerecs.forEach(record => {
  const date = new Date(record.createdAt);
  const day = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  if (counts.hasOwnProperty(day)) {
    counts[day]++;
  }
});
let uptimedata = Object.entries(counts).map(([date, downtimes]) => ({ date, downtimes }));

return NextResponse.json({"lighthouse":lighthouserep,
    'lighthousevalues':lighthousevalues,
    'avgperformance' : totalperformance/lighthouseall.length,
    'allperformances' : allperformances,
    'uptimedata':uptimedata.reverse()
});

  
}
