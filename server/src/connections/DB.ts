import sql, { QueryError } from 'mysql2'

interface IConfigDB{
    host:string
    user:string
    password:string
    database:string
}

export default class database{
    private conn!:sql.Connection
    private config:IConfigDB
    constructor(config:IConfigDB){
        this.config=config
    }
    connect(){
        this.conn=sql.createConnection(this.config)
    }
    query(str:string):Promise<{error?:QueryError,result?:any}>{
        return new Promise((s,_)=>{
            this.conn.query(str,(err,result)=>{
                s(err?{error:err}:{result})
            })
        })
    }
}

