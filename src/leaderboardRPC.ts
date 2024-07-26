interface ILeaderBoardResponse {
    status: string
    message?: string
    data?: any
}
interface ILeaderBoardReq
{
    leaderBoardId:string
    ownerIds?:string[]
}

let getLeaderboardRPC: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {

    try {
        const jsonPayload:ILeaderBoardReq = JSON.parse(payload);
        logger.debug(payload);
        if (!jsonPayload.leaderBoardId) throw new Error("Leaderboard Id not provided");

        const leaderBoardId = jsonPayload.leaderBoardId;

        if (leaderBoardId == undefined) throw new Error("Leaderboard Id not provided");

        let leaderboards: nkruntime.Leaderboard[];
        leaderboards = nk.leaderboardsGetId([leaderBoardId]);

        //should we create a leaderboard if it does not exist or return an error ?
        if (leaderboards.length == 0) {
            let L: LeaderBoard = new LeaderBoard();
            L.createLeaderBoard(leaderBoardId, nk);

            return JSON.stringify(
                {
                    message: "LeaderBoard Created",
                    status: "Succuess"
                }
            )
        }

        let leaderBoardRecords = nk.leaderboardRecordsList(leaderBoardId, jsonPayload.ownerIds, 100);

        const res: ILeaderBoardResponse =
        {
            status: "Succuess",
            data:leaderBoardRecords
        }
        return JSON.stringify(
            res
        )

    } catch (error: any) {
        const res: ILeaderBoardResponse = {
            status: "Error Occured",
            message: error.message,
        }
        return JSON.stringify(
            res
        )
    }

}