# Exported Monster Sanctuary Data Client

Makes using the following packages easier to use. These packages should be considered peer dependencies:
- [https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydata](https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydata)
- [https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydatatypes](https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydatatypes)

Unless otherwise specified the client will look for the Exported Monster Sanctuary Data in (cwd)/node_modules/@woodman231/exportedmonstersanctuarydata. However, you may use your own directory name if you have the data in a different directory.

Example:

``` typescript
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";

const main = async () => {
    const myClient = new ExportedMonsterSanctuaryDataClient();

    const debuffFileNames = await myClient.debuffsClient.getAllFileNamesAsync();
    debuffFileNames.forEach((debuffFileName) => {
        console.log(debuffFileName);
    });

    const buffObjects = await myClient.buffsClient.getAllObjectsInDirectoryAsync();
    buffObjects.forEach((buffObject) => {
        console.log(buffObject);
    });
}

main();
```

DISCLAIMER: This package was made by a fan of the game. I am not associated with [Moi Rai Games](https://monster-sanctuary.com/) the developer, nor [Team 17](https://www.team17.com/) the distributor.