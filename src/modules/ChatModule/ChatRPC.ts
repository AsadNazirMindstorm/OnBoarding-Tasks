let createRoomRPC :nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string) 
{
    let response:IchatResponse;
    try{
        response ={
            success:true,
            data:{},
            message:""

        }
        return JSON.stringify(response)
    }
    catch(e:any){
        response={
            success:false,
            message:e.message
        }
        JSON.stringify(response);
    }
}