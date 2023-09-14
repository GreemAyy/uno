import ky from "ky"
import { _URL } from "../c"

interface IReg{
    status:number
    responseText:string
    id?:number
}

export const regQuery=async(role:string):Promise<IReg>=>{
    const req = await ky.post(_URL+'/api/auth/reg',{json:{role}})
    return await req.json()
}