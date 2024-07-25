
let helloWorldrpc: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    return JSON.stringify(
        {
            "message": "This is a hello world RPC"
        }
    )
}

let writeCollection: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    let payloadJson = JSON.parse(payload);
    let collectionName = payloadJson.collectionName;
    let S:StorageUtility = new StorageUtility();
    
    S.writeStorage(ctx,logger,nk,"write");

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

    return JSON.stringify(
        {
            data: "hoi hoi"
        }
    )



}


//fix this make it load better :) 
let customAuthRpc: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
    let jsonPaload = JSON.parse(payload);
    let email = jsonPaload.email;
    let username = jsonPaload.username;
    let pass = jsonPaload.password;

    let write: nkruntime.StorageWriteRequest = {
        collection: 'reward',
        key: 'daily',
        permissionRead: 1,
        permissionWrite: 0,
        value: {
            "message": "this is some value"
        },
        userId: ctx.userId,
    }


    //let res = nk.storageWrite([write]);

    let res: nkruntime.AuthResult = nk.authenticateEmail(email, pass, username, jsonPaload.create);

    return JSON.stringify(
        {
            data: res
        }
    )
}

let InitModule: nkruntime.InitModule =
    function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
        logger.debug("This is Hello World RPC !!!!!!!!!!!")
        initializer.registerRpc("Hello World", helloWorldrpc);
        initializer.registerRpc("CutsomAuth", customAuthRpc);
        initializer.registerRpc("ReadCollectionRPC",writeCollection);

    }