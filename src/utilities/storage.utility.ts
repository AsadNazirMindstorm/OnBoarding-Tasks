class StorageUtility {
    constructor() {
        console.debug("Storage Utilities Object is Created")
    }

    public writeStorage(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, CollectionName: string, CollectionKey: string, Values: Object): any {

        logger.info("Collection Name: " + CollectionName);
        logger.info("Key : " + CollectionKey);

        //Craete a Write Request
        let writeData: nkruntime.StorageWriteRequest =
        {
            collection: CollectionName,
            key: CollectionKey,
            permissionRead: 1,
            permissionWrite: 0,
            value: Values,
            userId: ctx.userId,
        }

        //Writing the Values
        let status = nk.storageWrite([writeData]);

        return status;
    }

    public readStorage(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string) {
        logger.info("Read Storage is working");
    }


}