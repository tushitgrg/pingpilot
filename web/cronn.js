// scripts/monitoring-cron.js
const cron = require('node-cron');
const axios = require('axios');


// Schedule the task to run every 5 minutes
cron.schedule('*/1 * * * *', async () => {
  
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
   
});

cron.schedule('* */10 * * *', async () => {
  
  const users = await axios.get("https://pingpilot.vercel.app/api/get-all");
 console.log("lighthouse record!")
  for(let i=0; i<users.data.length;i++){
   
   try {
    const lighthouserecord = await axios.get(`https://pingpilot.vercel.app/api/lighthouse?id=${users.data[i].id}&url=${users.data[i].url}`)
     
    console.log("lighthouse record!")
    
   } catch (error) {
     console.error('Error in light:', );
    
   }
 
  
  }
    
 });

console.log('Cron job started. Monitoring every 5 minutes...');
