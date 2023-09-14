import { Reg } from "./user.method";

const init:Function[] = [Reg]

export default async function UserComponent(){
    for(let func of init){await func()}
}