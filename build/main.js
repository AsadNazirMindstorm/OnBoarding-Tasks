"use strict";
var helloWorldrpc = function helloWorld(ctx, logger, nk, payload) {
    return JSON.stringify({
        "message": "This is a hello world RPC"
    });
};
var customAuthRpc = function helloWorld(ctx, logger, nk, payload) {
    var jsonPaload = JSON.parse(payload);
    var email = jsonPaload.email;
    var username = jsonPaload.username;
    var res = nk.authenticateEmail(email, username, jsonPaload.create);
    return JSON.stringify({
        data: JSON.stringify(res)
    });
};
var InitModule = function (ctx, logger, nk, initializer) {
    logger.debug("This is Hello World RPC !!!!!!!!!!!");
    initializer.registerRpc("Hello World", helloWorldrpc);
    initializer.registerRpc("CutsomAuth", customAuthRpc);
};
