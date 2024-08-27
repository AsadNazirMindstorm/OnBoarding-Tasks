
let InitModule: nkruntime.InitModule =
    function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {

        try {
            logger.debug("Initilaizing")

            let leaderboardObj:LeaderBoardStorage = new LeaderBoardStorage();
            const configObj:ConfigurationModule = new ConfigurationModule();

            //Saving the co
            configObj.saveConfigurations(nk);
            //creating the leader
            leaderboardObj.createLeaderBoard(Constants.LEADBOARD_NAME,nk);
            //RPCs  
            initializer.registerRpc("authRPC", customAuthRpc);
            initializer.registerRpc("getLeaderboardRPC", getLeaderboardRPC)
            initializer.registerRpc("matchEndRPC", matchEnd);
            initializer.registerRpc("getconfigRPC", getConfigRpc);
            initializer.registerRpc("storageRpc", storageRpc);
        }
        catch (error: any) {
            logger.warn("Error Occured in Initialization : "+ error.message)
        }
    }