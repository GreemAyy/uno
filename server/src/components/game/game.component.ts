import { http } from "../..";
import socket from "../../connections/socket";

export default 
async function GameComponent(){
    const io = new socket(http,'/game').io
}