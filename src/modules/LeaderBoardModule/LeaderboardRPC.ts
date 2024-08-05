
let getLeaderboardRPC: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {

    try {

        //Converting the payload
        const jsonPayload:ILeaderBoardReq = JSON.parse(payload);
        //Checking for LeaderBoardID 
        if (!jsonPayload.leaderBoardId) throw new Error("Leaderboard Id not provided");

        //Getting the LeaderBoard Id
        const leaderBoardId = jsonPayload.leaderBoardId;

        //Throwing an error if not found
        if (leaderBoardId == undefined) throw new Error("Leaderboard Id not provided");

        //getting the leaderboard
        let leaderboards: nkruntime.Leaderboard[];
        leaderboards = nk.leaderboardsGetId([leaderBoardId]);

        //should we create a leaderboard if it does not exist or return an error ?
        if (leaderboards.length == 0) {
           
            const res:ILeaderBoardResponse ={
                success:false,
                message:"No LeaderBoad Found"
            }
            //throwing an error if leaderboard does not exist
            return JSON.stringify(
               res
            )
        }

        //fetching leaderboard records
        //optional parameter of leaderboard owners
        let leaderBoardRecords = nk.leaderboardRecordsList(leaderBoardId, jsonPayload.ownerIds, 100);

        //LeaderBoard response
        const res: ILeaderBoardResponse =
        {
            success: true,
            message:"Records fetched successfully",
            data:leaderBoardRecords
        }
        return JSON.stringify(
            res
        )

    } catch (error: any) {

        //Error Response 
        const errorRes: ILeaderBoardResponse = {
            success: false,
            message: error.message,
        }
        return JSON.stringify(
            errorRes
        )
    }

}