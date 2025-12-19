import NameValueClient from "../name_value_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

class BuffsClient extends NameValueClient<ExportedMonsterSanctuaryDataTypes.Buff> {
    constructor(buffsDirectory: string) {
        super(buffsDirectory);
    }
}

export default BuffsClient;
export { BuffsClient };