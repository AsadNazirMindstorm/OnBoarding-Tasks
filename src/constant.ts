class Constants {

   //collection constants
   public static readonly USER_COLLECTION: string = "User";
   public static readonly USER_STATE_KEY = "UserState"

   //user state constants
   public static readonly USER_STATE_DEFAULT_XP = 0;
   public static readonly USER_STATE_DEFAULT_LVL = 1;
   public static readonly USER_STATE_DEFAULT_COINS = 100;

   //Leader board constants
   public static readonly LEADERBOARD_DEFAULT_SORT = nkruntime.SortOrder.DESCENDING;
   public static readonly LEADERBOARD_OPERATOR = nkruntime.Operator.BEST;
   public static readonly LEADERBOARD_RESET_TIME = "0 0 * * 0";
   public static readonly LEADBOARD_NAME = "Global"

   //Config constants
   public static readonly CONFIG_COLLECTION = "configcollection";
   public static readonly ADMIN_ID = "00000000-0000-0000-0000-000000000000";
   public static readonly CONFIG_KEY = "configkey"
  
   //LeaderBoard Constants
   public static readonly GLOBAL_LEADERBOARD = "Global";

   //Room Costants
   public static readonly GLOBAL_CHAT_ROOM = "GlobalRoom";
}

interface IResponse {
   success: boolean
   errorCode?: string
   message: string
}