import path from "path";

import BuffsClient from "./buffs_client";
import DebuffsClient from "./debuffs_client";
import EnumsClient from "./enums_client";
import ItemsClient from "./items_client";
import MonstersClient from "./monsters_client";
import SpecialBuffsClient from "./special_buffs_client";

export default class ExportedMonsterSanctuaryDataClient {    
    buffsClient: BuffsClient;
    debuffsClient: DebuffsClient;
    enumsClient: EnumsClient;
    itemsClient: ItemsClient;
    monstersClient: MonstersClient;
    specialBuffsClient: SpecialBuffsClient;

    /**
     * Creates a new instance of the ExportedMonsterSanctuaryDataClient
     * @param {string | undefined} baseDirectoryName - The directory containing the monster sanctuary data. Defaults to cwd/node_modules/@woodman231/exportedmonstersanctuarydata
     */
    constructor(baseDirectoryName?: string | undefined) {
        let baseDirectoryToUse = '';

        if (typeof baseDirectoryName !== 'undefined') {
            baseDirectoryToUse = baseDirectoryName;
        } else {
            baseDirectoryToUse = path.join(process.cwd(), 'node_modules', '@woodman231', 'exportedmonstersanctuarydata');
        }

        const buffsPath = path.join(baseDirectoryToUse, 'Buffs');
        this.buffsClient = new BuffsClient(buffsPath);

        const debuffsPath = path.join(baseDirectoryToUse, 'Debuffs');
        this.debuffsClient = new DebuffsClient(debuffsPath);

        const enumsPath = path.join(baseDirectoryToUse, 'Enums');
        this.enumsClient = new EnumsClient(enumsPath);

        const itemsPath = path.join(baseDirectoryToUse, 'Items');
        this.itemsClient = new ItemsClient(itemsPath);

        const monstersPath = path.join(baseDirectoryToUse, 'Monsters');
        this.monstersClient = new MonstersClient(monstersPath);

        const specialBuffsPath = path.join(baseDirectoryToUse, 'SpecialBuffs');
        this.specialBuffsClient = new SpecialBuffsClient(specialBuffsPath);
    }
}
