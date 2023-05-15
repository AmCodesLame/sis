import * as red from './redis'

export async function scrapeWorkspace(app:any, force:boolean = false) {
    try {
      // Retrieve all members of the Slack group
      console.log(!(await red.getValue("info")))
    if (!(await red.getValue("info")) && force){
        const result = await app.client.users.list();
        const users = result.members;
        //   Store user information in Redis for each member
        const key = "info";
        let valueObj = JSON.parse(await red.getValue(key)) ?? {};
          for (const user of users) {
          if(!user.is_bot){
              const userID = `<@${user.id}>`;
              const realName = user.real_name;
              const email = user.profile?.email ?? 'N/A';
              const userName = user.profile?.display_name ?? 'N/A';
              const userKey =  userName.split(" ")[0].toLowerCase();
    
              const key:string = userID.concat(":info");
              valueObj[userKey] = 
                  {
                      realName,
                      email,
                      userName
              }
              
              
              console.log(key, valueObj)
              
          }
          
      }  
      var value = JSON.stringify(valueObj);
      red.setValue(key,value);
      console.log("[REDIS] user info stored in redis");
      return;
    }


    console.log('[REDIS] User information is already stored in Redis');
    } catch (error) {
      console.error('Error retrieving user information from Slack API:', error);
    }
  }



export function newScrape(app:any) {
    app.message(/^sis scan/, async({message, say} : {message: any; say: any}) =>{
        await scrapeWorkspace(app, true);
        await say("scanned the workspace again!")
    })
}