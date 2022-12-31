import NameValueClient from "../name_value_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

export default class DebuffsClient extends NameValueClient<ExportedMonsterSanctuaryDataTypes.Debuff> {
    constructor(debuffsDirectory: string) {
        super(debuffsDirectory);
    }
}