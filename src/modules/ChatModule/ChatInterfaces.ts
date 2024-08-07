interface IchatResponse extends IResponse
{
    data?:any
}

interface IchatRequest
{
    roomName:string,
    open?:boolean,
    roomDescription?:string
}