class StorageUtility {
    public writeStorage(userId:string | undefined, nk: nkruntime.Nakama, CollectionName: string, CollectionKey: string, Values: any) {

        let writeData: nkruntime.StorageWriteRequest =
        {
            collection: CollectionName,
            key: CollectionKey,
            value: Values,
            userId: userId,
        }

        //Writing the Values
        let status = nk.storageWrite([writeData]);

        return status;
    }

    public readStorage(userId:string, nk: nkruntime.Nakama, CollectionName: string, CollectionKey: string) {
        let readData:nkruntime.StorageReadRequest=
        {
            collection:CollectionName,
            key:CollectionKey,
            userId:userId
        }

        let res = nk.storageRead([readData]);

        return res;
    }


}