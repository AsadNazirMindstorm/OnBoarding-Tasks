// hehe
let storageRpc: nkruntime.RpcFunction = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  data: string
) {
  let response: IResponse;
  try {
    let storageUtil = new StorageUtility();
    let jsonPayload: IStorageRequest = JSON.parse(data);

    if (!validateTournament(jsonPayload.value)) throw new Error("THIS IS TYPE ERROR");

    const ack = storageUtil.writeStorage(
      undefined,
      nk,
      jsonPayload.collectionName,
      jsonPayload.key,
      jsonPayload.value
    );

    response = {
      success: true,
      message: "collection updated successfuly",
    };
  } catch (error: any) {
    logger.error(error.message);
    response = {
      success: false,
      message: "error occured on ",
    };
  }

  return JSON.stringify(response);
};
