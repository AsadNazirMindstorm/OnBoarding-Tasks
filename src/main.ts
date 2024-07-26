
let InitModule: nkruntime.InitModule =
    function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
        logger.debug("This is Hello World RPC !!!!!!!!!!!")

        // let Auth:AuthRPC = new AuthRPC();

        initializer.registerRpc("CutsomAuth", customAuthRpc);
        initializer.registerRpc("GetLeaderBoard",getLeaderboardRPC)
        initializer.registerRpc("MatchEnd",matchEnd);
    }