class LeaderBoardStorage {


    public createLeaderBoard(leaderboardId: string, nk: nkruntime.Nakama) {
        try {
            return nk.leaderboardCreate(leaderboardId, true, Constants.LEADERBOARD_DEFAULT_SORT, Constants.LEADERBOARD_OPERATOR, Constants.LEADERBOARD_RESET_TIME);
        } catch (error: any) {
            throw new Error(error.message)
        }

    }
}