class ConfigurationModule{
    public saveConfigurations(nk:nkruntime.Nakama){
        try{
        
            let configs:IConfigurations = {
                globalChatRoomId:Constants.GLOBAL_CHAT_ROOM,
                globalLeaderBoardId:Constants.GLOBAL_LEADERBOARD
            }
    
            let storageUtil = new StorageUtility();
            storageUtil.writeStorage(Constants.ADMIN_ID,nk,Constants.CONFIG_COLLECTION,Constants.CONFIG_KEY,configs);
            
        }catch(error:any){
            throw error;
        }
    }
}