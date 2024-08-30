class Constants {
  //collection constants
  public static readonly USER_COLLECTION: string = "User";
  public static readonly USER_STATE_KEY = "UserState";

  //user state constants
  public static readonly USER_STATE_DEFAULT_XP = 0;
  public static readonly USER_STATE_DEFAULT_LVL = 1;
  public static readonly USER_STATE_DEFAULT_COINS = 100;

  //Leader board constants
  public static readonly LEADERBOARD_DEFAULT_SORT =
    nkruntime.SortOrder.DESCENDING;
  public static readonly LEADERBOARD_OPERATOR = nkruntime.Operator.BEST;
  public static readonly LEADERBOARD_RESET_TIME = "0 0 * * 0";
  public static readonly LEADBOARD_NAME = "Global";

  //Config constants
  public static readonly CONFIG_COLLECTION = "configcollection";
  public static readonly ADMIN_ID = "00000000-0000-0000-0000-000000000000";
  public static readonly CONFIG_KEY = "configkey";

  //LeaderBoard Constants
  public static readonly GLOBAL_LEADERBOARD = "Global";

  //Room Costants
  public static readonly GLOBAL_CHAT_ROOM = "GlobalRoom";
}

interface IResponse {
  success: boolean;
  errorCode?: string;
  message: string;
}

// Define the interface for hole data
interface HoleData {
  courseId: string; // Text field input
  holeId: number; // A single number input through a drop-down
  teePosition: string; // A single number input through a drop-down
  windSpeed: string;
  windDirection: string[]; // Can contain multiple data based on checkboxes
}

//interfaces
interface Holes {
  holeCount: number; // Containing the whole number
  holeData: HoleData[]; //Containing the whole data
  isRandom: boolean;
}

interface Availability {
  startDateTime: string;
  endDateTime: string;
  totalTime: number;
  userPlayTime: number;
}

interface Meta {
  category: string;
  title: string;
  league: string;
  icon: string;
}

interface Tournament {
  metaData: Meta;
  availabiltyData: Availability;
  holeData: Holes;
  createdAt?: string;
  updatedAt?: string;
  pushedToNakama: boolean;
}

// TypeScript function to validate a JSON payload
function validateTournament(payload: Tournament): boolean {
  // Helper function to validate HoleData
  function validateHoleData(data: any): boolean {
    return (
      typeof data.courseId === "string" &&
      typeof data.holeId === "number" &&
      typeof data.teePosition === "string" &&
      typeof data.windSpeed === "string" &&
      Array.isArray(data.windDirection)
    );
  }

  // Helper function to validate Holes
  function validateHoles(data: any): boolean {
    return (
      typeof data.holeCount === "number" &&
      Array.isArray(data.holeData) &&
      data.holeData.every(validateHoleData) &&
      typeof data.isRandom === "boolean"
    );
  }

  // Helper function to validate Availability
  function validateAvailability(data: Availability): boolean {
    return (
      typeof data.startDateTime === "string" &&
      typeof data.endDateTime === "string" &&
      typeof data.totalTime === "number" &&
      typeof data.userPlayTime === "number"
    );
  }

  // Helper function to validate Meta
  function validateMeta(data: Meta): boolean {
    return (
      typeof data.category === "string" &&
      typeof data.title === "string" &&
      typeof data.league === "string" &&
      typeof data.icon === "string"
    );
  }

  // Main validation function for Tournament
  return (
    payload.metaData !== undefined &&
    validateMeta(payload.metaData) &&
    validateAvailability(payload.availabiltyData) &&
    payload.holeData !== undefined &&
    validateHoles(payload.holeData) &&
    payload.createdAt !== undefined &&
    payload.updatedAt !== undefined &&
    payload.pushedToNakama !== undefined
  );
}
