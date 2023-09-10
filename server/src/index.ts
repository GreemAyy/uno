console.clear()
import HTTP from "./connections/HTTP";
import database from "./connections/DB";
import { DBC } from "../DBC";
import { initComponents } from "./init";

const httpConnect = new HTTP()
httpConnect.connect()

export const app = httpConnect.app
export const http = httpConnect.http
export const DB = (()=>{
    const DB = new database(DBC)
    DB.connect()
    return DB   
})()
 
for(let component of initComponents){
    component()
}

httpConnect.listen(4000)


