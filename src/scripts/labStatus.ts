import * as red from '../services/redis'

export function labStatus(app:any) {
    app.message('lab', async({message, say} : {message: any; say: any}) =>{
        const msgObject : {text: string} = JSON.parse(JSON.stringify(message));
        console.log(msgObject)
        const textMsg : string = msgObject.text.toLowerCase();

        console.log(textMsg.includes("is lab open"))

        if(textMsg.includes("is lab open") || textMsg.includes("lab open hai kya") || textMsg.includes("lab open?")){
            const stat : string = await red.getValue("labStat")
            console.log(stat)
            stat == "1" ? await say("Yes, Lab is Open") : await say("No, Lab is closed");
            
        }

        if(textMsg.includes("is lab close") || textMsg.includes("lab close hai kya") || textMsg.includes("lab close?")){
            const stat : string = await red.getValue("labStat")
            console.log(stat)
            stat == "1" ? await say("No, Lab is open") : await say("Yes, Lab is closed");
        }
        
        if(textMsg.includes("lab is open") || textMsg.includes("lab opened") || textMsg.includes("open lab")){
            const stat : string = await red.getValue("labStat")
            console.log(stat);

            stat == "1" ? await say("Lab is already opened!") : await say("Okey Dokey! Lab is now opened")

            red.setValue("labStat", "1")
        }
        
        if(textMsg.includes("lab is close") || textMsg.includes("close lab")){
            const stat : string = await red.getValue("labStat")
            console.log(stat);

            stat == "1" ? await say("Alright! Lab is now closed") : await say("Lab is already Closed!")

            red.setValue("labStat", "0")
        }

        const stat : string = await red.getValue("labStat")
        console.log(stat);
        

    })
}       

// export function name(app:any) {
//     app.message('lab', async({message, say} : {message: any; say: any}) =>{

//     })
// }

