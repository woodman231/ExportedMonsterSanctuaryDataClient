import ReferenceableClient from "../referenceable_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

export default class MonstersClient extends ReferenceableClient<ExportedMonsterSanctuaryDataTypes.Monster> {
    constructor(monstersDirectory: string) {
        super(monstersDirectory);
    }
}