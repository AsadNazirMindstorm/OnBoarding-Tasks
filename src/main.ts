interface StorageResponse
{
    message:string,
    status:string,
    response:any
}


let helloWorldrpc: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    return JSON.stringify(
        {
            "message": "This is a hello world RPC"
        }
    )
}

function setDefaultUserState()
{

}

let writeUserStateRPC: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    let payloadJson = JSON.parse(payload);

    //Creating an instance of Storage Utility
    let S: StorageUtility = new StorageUtility();

    //Writing to the Collection and Returning a response
    let res = '';

    //read request
    // var objectId: nkruntime.StorageReadRequest = {
    //     collection: collectionName,
    //     key: 'daily',
    //     userId: ctx.userId,
    // }

    // var objects: nkruntime.StorageObject[];
    // try {
    //     objects = nk.storageRead([objectId]);
    // } catch (error) {
    //     logger.error('storageRead error: %s', error);
    //     throw error;
    // }

    let _response:StorageResponse = 
    {
        message:"Data Written",
        status:"Done",
        response:res

    }

    return JSON.stringify(
        _response
    )
}



let InitModule: nkruntime.InitModule =
    function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
        logger.debug("This is Hello World RPC !!!!!!!!!!!")

        // let Auth:AuthRPC = new AuthRPC();

        initializer.registerRpc("Hello World", helloWorldrpc);
        initializer.registerRpc("CutsomAuth", customAuthRpc);
        initializer.registerRpc("WriteUserStateRPC",writeUserStateRPC);

    }