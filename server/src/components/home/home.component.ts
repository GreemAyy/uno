import { createGame, connectGame } from "./home.method";
import socketIO from "../../connections/socket";
import { http } from "../..";

const init = [createGame,connectGame]

export default async function HomeComponent(){
    for(let func of init){await func()}
    const io = (new socketIO(http,'/home')).io
    io.on('connection',socket=>{
        socket.on('data',data=>{
            socket.emit("data",'data')
        })
    })
}