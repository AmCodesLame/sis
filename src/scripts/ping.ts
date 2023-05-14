

export function ping(app : any){
    app.message('ping', async ({ message , say } : {message: any; say: any})=> {
        console.log(JSON.parse(JSON.stringify(message)).text)
        await say('pong');
    });
}
