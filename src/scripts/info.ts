import * as red from "../services/redis"


export function info(app:any) {
    app.message(/^sis info/, async({message, say} : {message: any; say: any}) =>{
        const msgObject : {text: string} = JSON.parse(JSON.stringify(message));
        // console.log(msgObject)
        const textMsg : string = msgObject.text.toLowerCase();

        const user = textMsg.replace("sis info ", "").split(" ")[0];
        const blah = JSON.parse(await red.getValue("info"));

        await say(`\`\`\` name: ${blah[user].realName} \n email: ${blah[user].email}\`\`\``)

    })
}