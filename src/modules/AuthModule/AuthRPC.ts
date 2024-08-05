
//Custom Auth Working Fine
let customAuthRpc: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {

    try {

        //JSON payload parsing
        const jsonPayload:IauthReq = JSON.parse(payload);

        //creating
        const authS:AuthStorage= new AuthStorage();

        //Checking Payload
        if (jsonPayload.email == undefined) throw new Error("Email is required");
        else if (jsonPayload.username == undefined) throw new Error("Username is required");
        else if (jsonPayload.password == undefined) throw new Error("Password is required");
        else if (!authS.validateEmail(jsonPayload.email)) throw new Error("Enter email in correct format");


        //Creating an object of user state to set the user states
        let userStateObj: State = new State();

        //calling the built in RPC of authenticate email
        let res: nkruntime.AuthResult = nk.authenticateEmail(jsonPayload.email, jsonPayload.password, jsonPayload.username);
        
        //get the user state
        let user:nkruntime.StorageObject[] = userStateObj.getUserState(res.userId, logger, nk);

        // check if the user state exists or not
        if (user == undefined || user == null || user.length == 0) {
            //this will set default values for a new user
            userStateObj.setUserState(res.userId, logger, nk);

            //get the new user state that was created
            user = userStateObj.getUserState(res.userId,logger,nk);
        }


        //Auth Response 
        let response :IauthRes=
        {
            success:true,
            message:"User has been authenticated",
            userId:res.userId,
            data: user[0].value
        }

        return JSON.stringify(
            response
        )
    }

    catch (error: any) {
        let errorRes:IauthRes=
        {     
            success:false,
            message:error.message,
            userId:ctx.userId
        }
        return JSON.stringify(errorRes);
    }
}
