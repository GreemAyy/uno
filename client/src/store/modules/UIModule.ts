interface Status{
    isOpen:boolean
    status:string
    data:string
}

export default (function UIModule(){
    return({
        state:()=>({
            bottomNotifyIsOpen:false,
            bottomNotifyStatus:'default',
            bottomNotifyData:""
        }),
        mutations:{
            //@ts-ignore
            setBottomNotify(state,status:Status){
                state.bottomNotifyIsOpen=status.isOpen
                state.bottomNotifyStatus=status.status
                state.bottomNotifyData=status.data
                setTimeout(()=>{
                    if(status.isOpen)
                        state.bottomNotifyIsOpen=false
                },3000)
            }
        }
    })
})()