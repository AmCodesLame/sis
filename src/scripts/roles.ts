import * as red from '../services/redis'

// <@U0576JDMAQG>

export function setRoles(app:any) {
    app.message( /sis <@...........>/ , async({message, say} : {message: any; say: any}) =>{
        const msgObject : {text: string; user: string} = JSON.parse(JSON.stringify(message));
        console.log(msgObject)
        const textMsg : string = msgObject.text.toLowerCase();

        if(textMsg.includes("is") && !textMsg.includes("not")){
            const userID:string =  msgObject.text.replace("sis ", "").split(" ")[0];
            const role: string = textMsg.replace(/sis <@...........> is /, "")

            const key:string = userID.concat(":role");   
            let valueArr = JSON.parse(await red.getValue(key));           

            if(valueArr != null) {
                valueArr.push(role)
                var value = JSON.stringify(valueArr);
                console.log(key,value)
            } 
            else{
                let valueArr:Array<string> = [];
                valueArr.push(role)
                var value = JSON.stringify(valueArr);
                console.log(key,value)
            }
            
            red.setValue(key,value);
            await say("As you wish!".concat(` ${userID} is ${role}`))
            
        }

        if(textMsg.includes("is not")) {
            const userID:string =  msgObject.text.replace(/sis /, "").split(" ")[0];
            const role: string = textMsg.replace(/sis <@...........> is not /, "")

            const key: string=  userID.concat(":role");
            const roleArr:Array<string> = JSON.parse(await red.getValue(key));
            const result = roleArr.filter(word=> word != role)

            if(result.length == roleArr.length){
                roleArr.push("not ".concat(role))
                const valueArr = JSON.stringify(roleArr)
                red.setValue(key,valueArr)
                await say(`Ouu, ${userID} is not ${role} from now`)
            }
            else{
                const valueArr = JSON.stringify(result);
                red.setValue(key,valueArr)
                await say(`Okay! ${userID} is not \"${role}\" anymore`)
            }

        }
    })
}

export function getRoles(app:any) {
    app.message(/sis who is <@...........>/, async({message, say} : {message: any; say: any}) =>{
        const msgObject : {text: string} = JSON.parse(JSON.stringify(message));
        console.log(msgObject)
        
        const userID:string =  msgObject.text.replace(/sis who is /, "").split(" ")[0];
        const key:string = userID.concat(":role");   
    
        let roleArr:Array<string> = JSON.parse(await red.getValue(key))
        let roleStr:string = roleArr.join(", ");
        await say(`${userID} is `.concat(roleStr));  
    })
}












// import * as red from '../services/redis'


// export function name(app:any) {
//     app.message('lab', async({message, say} : {message: any; say: any}) =>{
    // const msgObject : {text: string} = JSON.parse(JSON.stringify(message));
    //     console.log(msgObject)
    //     const textMsg : string = msgObject.text.toLowerCase();
//     })
// }