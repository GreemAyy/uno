import { http } from "../..";
import socket from "../../connections/socket";
import { getGame, getStatus, move } from "./game.method";

const init=[getGame,move]

export default 
async function GameComponent(){
    for(let func of init){await func()}
    const io = new socket(http,'/game').io
    io.on('connection',socket=>{
        socket.on('join',async(data:string)=>{
            const parsed = JSON.parse(data)
            socket.join(parsed.gameID)
            const status = await getStatus(parsed.gameID)
            io.to(parsed.gameID).emit('join',status)
        })
        socket.on('move',async _ =>{
            const parsed = JSON.parse(_)
            io.to(parsed.gameID).emit('move')
        })
    })
}