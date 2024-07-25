"use strict";
var helloWorldrpc = function (ctx, logger, nk, payload) {
    return JSON.stringify({
        "message": "This is a hello world RPC"
    });
};
var readCollection = function (ctx, logger, nk, payload) {
    var payloadJson = JSON.parse(payload);
    var collectionName = payloadJson.collectionName;
    var S = new StorageUtility();
    //testing it 
    S.readStorage(ctx, logger, nk, "Read");
    S.writeStorage(ctx, logger, nk, "write");
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
    return JSON.stringify({
        data: "hoi hoi"
    });
};
var customAuthRpc = function (ctx, logger, nk, payload) {
    var jsonPaload = JSON.parse(payload);
    var email = jsonPaload.email;
    var username = jsonPaload.username;
    var pass = jsonPaload.password;
    var write = {
        collection: 'reward',
        key: 'daily',
        permissionRead: 1,
        permissionWrite: 0,
        value: {
            "message": "this is some value"
        },
        userId: ctx.userId,
    };
    //let res = nk.storageWrite([write]);
    var res = nk.authenticateEmail(email, pass, username, jsonPaload.create);
    return JSON.stringify({
        data: res
    });
};
var InitModule = function (ctx, logger, nk, initializer) {
    logger.debug("This is Hello World RPC !!!!!!!!!!!");
    initializer.registerRpc("Hello World", helloWorldrpc);
    initializer.registerRpc("CutsomAuth", customAuthRpc);
    initializer.registerRpc("ReadCollectionRPC", readCollection);
};
var StorageUtility = /** @class */ (function () {
    function StorageUtility() {
    }
    StorageUtility.prototype.writeStorage = function (ctx, logger, nk, payload) {
        // nk.storageWrite()
        logger.info("Write Storage Utility is Working");
    };
    StorageUtility.prototype.readStorage = function (ctx, logger, nk, payload) {
        logger.info("Read Storage is working");
    };
    return StorageUtility;
}());
