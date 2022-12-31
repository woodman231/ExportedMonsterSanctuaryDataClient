import DirectoryClient from "../directory_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

export default class EnumsClient extends DirectoryClient<ExportedMonsterSanctuaryDataTypes.EnumDetail> {
    constructor(enumsDirectory: string) {
        super(enumsDirectory);
    }
}