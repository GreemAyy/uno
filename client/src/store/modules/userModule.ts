import { getCookiesAll } from "../../tools/cookie"

const cookies= getCookiesAll()

const userModule={
    state:()=>({
        id:cookies.id?cookies.id:null
    }),
    mutations:{
        //@ts-ignore
        setId(state,id){
            state.id=id
        }
    }
}

export default userModule