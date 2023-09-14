import { createGame, connectGame, getGames } from "./home.method";
import socketIO from "../../connections/socket";
import { http } from "../..";

const init = [createGame,connectGame,getGames]

export default async function HomeComponent(){
    for(let func of init){ await func() }
    const io = (new socketIO(http,'/home')).io
    io.on('connection',socket=>{
        socket.on("update",_=>{
            io.emit("update")
        })
    })
} 