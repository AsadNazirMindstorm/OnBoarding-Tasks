class Constants {

   //collection constants
   public static readonly USER_COLLECTION:string = "User";
   public static readonly USER_STATE_KEY = "UserState"

   //user state constants
   public static readonly USER_STATE_DEFAULT_XP=0;
   public static readonly USER_STATE_DEFAULT_LVL=1;
   public static readonly USER_STATE_DEFAULT_COINS=100;

   //Leader board constants
   public static readonly LEADERBOARD_DEFAULT_SORT=nkruntime.SortOrder.DESCENDING;
   public static readonly LEADERBOARD_OPERATOR=nkruntime.Operator.BEST;
   public static readonly LEADERBOARD_RESET_TIME="0 0 * * 0";
   public static readonly LEADBOARD_NAME="Global"

}

interface Iresponse 
{
   success:boolean
   errorCode?:string
   message:string
}