import express ,{Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'

export default class HTTP{
    app!:Application
    port!:number
    http!:http.Server
    constructor(){}
    connect(){
        this.app=express()
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.http=http.createServer(this.app)
    }
    listen(port:number=Number(process.env.PORT)){
        this.http.listen(port)
    }
}

