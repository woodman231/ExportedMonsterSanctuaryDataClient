import ReferenceableClient from "../referenceable_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

export default class ItemsClient extends ReferenceableClient<ExportedMonsterSanctuaryDataTypes.Item> {
    constructor(itemsDirectory: string) {
        super(itemsDirectory);
    }
}