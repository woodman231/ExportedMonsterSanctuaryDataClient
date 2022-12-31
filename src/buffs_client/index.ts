import NameValueClient from "../name_value_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

export default class BuffsClient extends NameValueClient<ExportedMonsterSanctuaryDataTypes.Buff> {
    constructor(buffsDirectory: string) {
        super(buffsDirectory);
    }
}