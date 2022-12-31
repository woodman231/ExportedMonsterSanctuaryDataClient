import NameValueClient from "../name_value_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

export default class SpecialBuffsClient extends NameValueClient<ExportedMonsterSanctuaryDataTypes.SpecialBuff> {
    constructor(specialBuffsDirectory: string) {
        super(specialBuffsDirectory);
    }
}