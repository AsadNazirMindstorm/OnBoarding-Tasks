
//Match End RPC
let matchEnd: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string 
{
    try{
        const jsonPayload:ImatchReq = JSON.parse(payload);
        
        if(!jsonPayload.userState) throw new Error("user state is required");
        const newUserState:IuserState = jsonPayload.userState;

        //Creating an instance of match class
        let matchObj:MatchStorage = new MatchStorage();

        if(newUserState.level == undefined)
            newUserState.level=Constants.USER_STATE_DEFAULT_LVL;
        if (!newUserState.xp)
            newUserState.xp=Constants.USER_STATE_DEFAULT_XP;

        //Calculating score
        const score:number = matchObj.scoreCalculator(newUserState.level,newUserState.xp);
        const response = nk.leaderboardRecordWrite(Constants.LEADBOARD_NAME,ctx.userId,ctx.username,score);

        //updating user state 
        const userStateObj:State = new State();
        userStateObj.setUserState(ctx.userId,logger,nk,newUserState);

        //Leader Board response
        const res:ImatchResponse = {
            success:true,
            message:"Record entered successfully",
            data:response
        }

        //response sent
        return JSON.stringify(
            res
        )
    }
    catch(error:any)
    {
    
        //error response
        const errorRes:ImatchResponse={
            message:error.message,
            success:false
        }
        return JSON.stringify
        (
            errorRes
        )
    }
}