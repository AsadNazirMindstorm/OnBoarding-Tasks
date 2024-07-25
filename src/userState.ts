interface IuserState {
    xp?: number
    coins?: number
    level?: number
}


class UserState {

    constructor() {
    }
    public setUserState(userId:string, logger: nkruntime.Logger, nk: nkruntime.Nakama, userState?: IuserState) {

        //user state that will be set
        let _userState ={}

        //if userstate is not passed to this funnction than it is default value for the state
        if(userState===undefined || userState===null) _userState={
            xp:Constants.USER_STATE_DEFAULT_XP,
            coins:Constants.USER_STATE_DEFAULT_COINS,
            level:Constants.USER_STATE_DEFAULT_LVL
        }

        else _userState = userState;

        //make  a read request via Storage Utilities
        let S: StorageUtility = new StorageUtility();

        //wrting the data and the response
        return S.writeStorage(userId, nk, Constants.USER_COLLECTION, Constants.USER_STATE_KEY, _userState);
    }

    public getUserState(userId:string, logger: nkruntime.Logger, nk: nkruntime.Nakama) {

        //make  a read request via Storage Utilities
        let S: StorageUtility = new StorageUtility();

        return S.readStorage(userId, nk, Constants.USER_COLLECTION, Constants.USER_STATE_KEY);

    }
}