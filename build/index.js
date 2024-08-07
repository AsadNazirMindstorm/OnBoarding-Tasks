"use strict";
var InitModule = function (ctx, logger, nk, initializer) {
    try {
        logger.debug("Initilaizing");
        var leaderboardObj = new LeaderBoardStorage();
        //creating the leader
        leaderboardObj.createLeaderBoard(Constants.LEADBOARD_NAME, nk);
        //RPCs  
        initializer.registerRpc("authRPC", customAuthRpc);
        initializer.registerRpc("getLeaderboardRPC", getLeaderboardRPC);
        initializer.registerRpc("matchEndRPC", matchEnd);
    }
    catch (error) {
        logger.warn("Error Occured in Initialization : " + error.message);
    }
};
var StorageUtility = /** @class */ (function () {
    function StorageUtility() {
    }
    StorageUtility.prototype.writeStorage = function (userId, nk, CollectionName, CollectionKey, Values) {
        var writeData = {
            collection: CollectionName,
            key: CollectionKey,
            value: Values,
            userId: userId,
        };
        //Writing the Values
        var status = nk.storageWrite([writeData]);
        return status;
    };
    StorageUtility.prototype.readStorage = function (userId, nk, CollectionName, CollectionKey) {
        var readData = {
            collection: CollectionName,
            key: CollectionKey,
            userId: userId
        };
        var res = nk.storageRead([readData]);
        return res;
    };
    return StorageUtility;
}());
var Constants = /** @class */ (function () {
    function Constants() {
    }
    //collection constants
    Constants.USER_COLLECTION = "User";
    Constants.USER_STATE_KEY = "UserState";
    //user state constants
    Constants.USER_STATE_DEFAULT_XP = 0;
    Constants.USER_STATE_DEFAULT_LVL = 1;
    Constants.USER_STATE_DEFAULT_COINS = 100;
    //Leader board constants
    Constants.LEADERBOARD_DEFAULT_SORT = "descending" /* nkruntime.SortOrder.DESCENDING */;
    Constants.LEADERBOARD_OPERATOR = "best" /* nkruntime.Operator.BEST */;
    Constants.LEADERBOARD_RESET_TIME = "0 0 * * 0";
    Constants.LEADBOARD_NAME = "Global";
    //Config constants
    Constants.CONFIG_COLLECTION = "configcollection";
    Constants.ADMIN_ID = "00000000-0000-0000-0000-000000000000";
    Constants.CONFIG_KEY = "configkey";
    //LeaderBoard Constants
    Constants.GLOBAL_LEADERBOARD = "Global";
    //Room Costants
    Constants.GLOBAL_CHAT_ROOM = "GlobalRoom";
    return Constants;
}());
//Custom Auth Working Fine
var customAuthRpc = function (ctx, logger, nk, payload) {
    try {
        //JSON payload parsing
        var jsonPayload = JSON.parse(payload);
        //creating
        var authS = new AuthStorage();
        //Checking Payload
        if (jsonPayload.email == undefined)
            throw new Error("Email is required");
        else if (jsonPayload.username == undefined)
            throw new Error("Username is required");
        else if (jsonPayload.password == undefined)
            throw new Error("Password is required");
        else if (!authS.validateEmail(jsonPayload.email))
            throw new Error("Enter email in correct format");
        //Creating an object of user state to set the user states
        var userStateObj = new State();
        //calling the built in RPC of authenticate email
        var res = nk.authenticateEmail(jsonPayload.email, jsonPayload.password, jsonPayload.username);
        //get the user state
        var user = userStateObj.getUserState(res.userId, logger, nk);
        // check if the user state exists or not
        if (user == undefined || user == null || user.length == 0) {
            //this will set default values for a new user
            userStateObj.setUserState(res.userId, logger, nk);
            //get the new user state that was created
            user = userStateObj.getUserState(res.userId, logger, nk);
        }
        //Auth Response 
        var response = {
            success: true,
            message: "User has been authenticated",
            userId: res.userId,
            data: user[0].value
        };
        return JSON.stringify(response);
    }
    catch (error) {
        var errorRes = {
            success: false,
            message: error.message,
            userId: ctx.userId
        };
        return JSON.stringify(errorRes);
    }
};
var AuthStorage = /** @class */ (function () {
    function AuthStorage() {
    }
    // Utility function to validate email format
    AuthStorage.prototype.validateEmail = function (email) {
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
    };
    ;
    return AuthStorage;
}());
var State = /** @class */ (function () {
    function State() {
    }
    State.prototype.setUserState = function (userId, logger, nk, userState) {
        //user state that will be set
        var userNewState = {};
        //if userstate is not passed to this funnction than it is default value for the state
        if (userState === undefined || userState === null)
            userNewState = {
                xp: Constants.USER_STATE_DEFAULT_XP,
                coins: Constants.USER_STATE_DEFAULT_COINS,
                level: Constants.USER_STATE_DEFAULT_LVL
            };
        //assignment of the new user state
        else
            userNewState = userState;
        //make  a read request via Storage Utilities
        var S = new StorageUtility();
        //wrting the data and the response
        return S.writeStorage(userId, nk, Constants.USER_COLLECTION, Constants.USER_STATE_KEY, userNewState);
    };
    State.prototype.getUserState = function (userId, logger, nk) {
        //make  a read request via Storage Utilities
        var S = new StorageUtility();
        //returning the response
        return S.readStorage(userId, nk, Constants.USER_COLLECTION, Constants.USER_STATE_KEY);
    };
    return State;
}());
var getLeaderboardRPC = function (ctx, logger, nk, payload) {
    try {
        //Converting the payload
        var jsonPayload = JSON.parse(payload);
        //Checking for LeaderBoardID 
        if (!jsonPayload.leaderBoardId)
            throw new Error("Leaderboard Id not provided");
        //Getting the LeaderBoard Id
        var leaderBoardId = jsonPayload.leaderBoardId;
        //Throwing an error if not found
        if (leaderBoardId == undefined)
            throw new Error("Leaderboard Id not provided");
        //getting the leaderboard
        var leaderboards = void 0;
        leaderboards = nk.leaderboardsGetId([leaderBoardId]);
        //should we create a leaderboard if it does not exist or return an error ?
        if (leaderboards.length == 0) {
            var res_1 = {
                success: false,
                message: "No LeaderBoad Found"
            };
            //throwing an error if leaderboard does not exist
            return JSON.stringify(res_1);
        }
        //fetching leaderboard records
        //optional parameter of leaderboard owners
        var leaderBoardRecords = nk.leaderboardRecordsList(leaderBoardId, jsonPayload.ownerIds, 100);
        //LeaderBoard response
        var res = {
            success: true,
            message: "Records fetched successfully",
            data: leaderBoardRecords
        };
        return JSON.stringify(res);
    }
    catch (error) {
        //Error Response 
        var errorRes = {
            success: false,
            message: error.message,
        };
        return JSON.stringify(errorRes);
    }
};
var LeaderBoardStorage = /** @class */ (function () {
    function LeaderBoardStorage() {
    }
    LeaderBoardStorage.prototype.createLeaderBoard = function (leaderboardId, nk) {
        try {
            return nk.leaderboardCreate(leaderboardId, true, Constants.LEADERBOARD_DEFAULT_SORT, Constants.LEADERBOARD_OPERATOR, Constants.LEADERBOARD_RESET_TIME);
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    return LeaderBoardStorage;
}());
//Match End RPC
var matchEnd = function (ctx, logger, nk, payload) {
    try {
        var jsonPayload = JSON.parse(payload);
        if (!jsonPayload.userState)
            throw new Error("user state is required");
        var newUserState = jsonPayload.userState;
        //Creating an instance of match class
        var matchObj = new MatchStorage();
        if (newUserState.level == undefined)
            newUserState.level = Constants.USER_STATE_DEFAULT_LVL;
        if (!newUserState.xp)
            newUserState.xp = Constants.USER_STATE_DEFAULT_XP;
        //Calculating score
        var score = matchObj.scoreCalculator(newUserState.level, newUserState.xp);
        var response = nk.leaderboardRecordWrite(Constants.LEADBOARD_NAME, ctx.userId, ctx.username, score);
        //updating user state 
        var userStateObj = new State();
        userStateObj.setUserState(ctx.userId, logger, nk, newUserState);
        //Leader Board response
        var res = {
            success: true,
            message: "Record entered successfully",
            data: response
        };
        //response sent
        return JSON.stringify(res);
    }
    catch (error) {
        //error response
        var errorRes = {
            message: error.message,
            success: false
        };
        return JSON.stringify(errorRes);
    }
};
var MatchStorage = /** @class */ (function () {
    function MatchStorage() {
    }
    MatchStorage.prototype.scoreCalculator = function (level, xp) {
        // Calculate score using the weighted sum
        var score = level * xp;
        return score;
    };
    return MatchStorage;
}());
var createRoomRPC = function (ctx, logger, nk, payload) {
    var response;
    try {
        response = {
            success: true,
            data: {},
            message: ""
        };
        return JSON.stringify(response);
    }
    catch (e) {
        response = {
            success: false,
            message: e.message
        };
        JSON.stringify(response);
    }
};
var getConfigRpc = function (ctx, logger, nk, payload) {
    var response;
    try {
        var jsonPayload = JSON.parse(payload);
        var configResponse = new Storage().readObject(nk, Constants.CONFIG_COLLECTION, Constants.CONFIG_KEY, ctx.userId);
        logger.debug(JSON.stringify(configResponse));
        response = {
            configurations: JSON.parse(JSON.stringify(configResponse[0].value)),
            success: true,
            message: "configs are fetched"
        };
    }
    catch (error) {
        logger.debug(error.message);
        response = {
            success: false,
            message: error.message
        };
    }
    return JSON.stringify(response);
};
var ConfigurationModule = /** @class */ (function () {
    function ConfigurationModule() {
    }
    ConfigurationModule.prototype.saveConfigurations = function (nk) {
        try {
            var configs = {
                globalChatRoomId: Constants.GLOBAL_CHAT_ROOM,
                globalLeaderBoardId: Constants.GLOBAL_LEADERBOARD
            };
            var storageUtil = new Storage();
            storageUtil.writeObject(nk, Constants.CONFIG_COLLECTION, Constants.CONFIG_KEY, Constants.ADMIN_ID, configs);
        }
        catch (error) {
            throw error;
        }
    };
    return ConfigurationModule;
}());
