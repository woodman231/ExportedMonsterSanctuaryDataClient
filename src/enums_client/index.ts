import DirectoryClient from "../directory_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

class EnumsClient extends DirectoryClient<ExportedMonsterSanctuaryDataTypes.EnumDetail> {
    constructor(enumsDirectory: string) {
        super(enumsDirectory);
    }
}

export default EnumsClient;
export { EnumsClient };