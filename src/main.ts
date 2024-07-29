
let InitModule: nkruntime.InitModule =
    function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {

        try {
            logger.debug("Initilaizing")

            let leaderboardObj:LeaderBoardStorage = new LeaderBoardStorage();

            //creating the leader
            leaderboardObj.createLeaderBoard(Constants.LEADBOARD_NAME,nk);
            //RPCs  
            initializer.registerRpc("authRPC", customAuthRpc);
            initializer.registerRpc("getLeaderboardRPC", getLeaderboardRPC)
            initializer.registerRpc("matchEndRPC", matchEnd);
        }
        catch (error: any) {
            logger.warn("Error Occured in Initialization : "+ error.message)
        }
    }