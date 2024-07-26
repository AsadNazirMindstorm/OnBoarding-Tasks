
interface ImatchResponse
{
    message?:string
    data?:any
    status:string
}

function scoreCalculator(level:number, xp:number):number {
    // Define maximum values for normalization (adjust as needed)
    const maxLevel = 100;
    const maxXp = 10000;

    // Define weight for XP contribution (adjust as needed)
    const weight = 0.5;
    
    // Normalize level and XP
    const normalizedLevel = level/ maxLevel;
    const normalizedXp = xp / maxXp;
    
    // Calculate score using the weighted sum
    const score = normalizedLevel + weight * normalizedXp;
    
    return score;
}

//Match End RPC
let matchEnd: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string 
{
    try{
        const jsonPayload = JSON.parse(payload);
        
        if(!jsonPayload.userState) throw new Error("user state is required");
        const newUserState:IuserState = jsonPayload.userState;


        const score:number = scoreCalculator(newUserState.level,newUserState.xp);
        const response = nk.leaderboardRecordWrite(Constants.LEADBOARD_NAME,ctx.userId,ctx.username,newUserState.level);

        const res:ImatchResponse = {
            status:"Record Entered",
            data:response
        }

        //response sent
        return JSON.stringify(
            res
        )
    }
    catch(error:any)
    {
    
        const res:ImatchResponse={
            message:error.message,
            status:"error"
        }
        return JSON.stringify
        (
            res
        )
    }
}