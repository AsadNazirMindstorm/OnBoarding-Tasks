interface IauthRes {
    status: string,
    message: string,
    userId: string
}


    // Utility function to validate email format
    function validateEmail (email: string): boolean {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    };

    //Custom Auth Working Fine
    let customAuthRpc: nkruntime.RpcFunction = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {

        try {
            const jsonPaload = JSON.parse(payload);
            const email = jsonPaload.email;
            const username = jsonPaload.username;
            const pass = jsonPaload.password;

            //missing checks
            if (email == undefined) throw new Error("Email is required");
            else if (username == undefined) throw new Error("Username is required");
            else if (pass == undefined) throw new Error("Password is required");
            else if(!validateEmail(email)) throw new Error("Enter email in correct format");

            let userStateObj:UserState= new UserState();
            
            
            
            let res: nkruntime.AuthResult = nk.authenticateEmail(email, pass, username);
            let user = userStateObj.getUserState(res.userId,logger,nk);

            if(user==undefined || user==null || user.length==0)
            {
                //this will set default values for a new user
                userStateObj.setUserState(res.userId,logger,nk);
            }

            let response :IauthRes=
            {
                status:"Authentcated",
                message:"Authemtication done",
                userId:res.userId
            }

            return JSON.stringify(
                response
            )
        }

        catch (error: any) {
            const res: IauthRes =
            {
                message: error.message,
                status: "Error",
                userId: ctx.userId
            }
            return JSON.stringify(
                res
            )
        }
    }
