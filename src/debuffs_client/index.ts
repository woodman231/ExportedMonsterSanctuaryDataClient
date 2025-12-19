import NameValueClient from "../name_value_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

class DebuffsClient extends NameValueClient<ExportedMonsterSanctuaryDataTypes.Debuff> {
    constructor(debuffsDirectory: string) {
        super(debuffsDirectory);
    }
}

export default DebuffsClient;
export { DebuffsClient };