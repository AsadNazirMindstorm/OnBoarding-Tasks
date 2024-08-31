
class State {

    public setUserState(userId:string, logger: nkruntime.Logger, nk: nkruntime.Nakama, userState?: IuserState) {

        //user state that will be set
        let userNewState ={}

        //if userstate is not passed to this funnction than it is default value for the state
        if(userState===undefined || userState===null) userNewState={
            xp:Constants.USER_STATE_DEFAULT_XP,
            coins:Constants.USER_STATE_DEFAULT_COINS,
            level:Constants.USER_STATE_DEFAULT_LVL
        }
        
        //assignment of the new user state
        else userNewState = userState;

        //make  a read request via Storage Utilities
        let S: StorageUtility = new StorageUtility();

        //wrting the data and the response
        return S.writeStorage(userId, nk, Constants.USER_COLLECTION, Constants.USER_STATE_KEY, userNewState);
    }

    public getUserState(userId:string, logger: nkruntime.Logger, nk: nkruntime.Nakama) {

        //make  a read request via Storage Utilities
        let S: StorageUtility = new StorageUtility();

        //returning the response
        return S.readStorage(userId, nk, Constants.USER_COLLECTION, Constants.USER_STATE_KEY);

    }
}