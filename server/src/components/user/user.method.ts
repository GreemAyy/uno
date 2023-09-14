import { DB, app } from "../..";
import { queryCreateUser } from "./user.path";

type RegBody={
    name?:string
    password?:string
    role:string
}

export async function Reg(){
    app.post('/api/auth/reg', async(req,res)=>{
        const body :RegBody = req.body
        if(body.role=='guest'){
            const queryStr = queryCreateUser("","",body.role)
            try{
                const create = await DB.query(queryStr)
                res.send(create?.error?
                        {status:400,responseText:'error'}:
                        {status:200,responseText:'ok',id:create?.result.insertId})
            }catch(e){
                res.send({status:400,responseText:'error'})
            }
        }else
            res.send({status:400,responseText:'error'})
    })
}
