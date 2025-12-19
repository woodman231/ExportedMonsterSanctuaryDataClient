import ReferenceableClient from "../referenceable_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

class ItemsClient extends ReferenceableClient<ExportedMonsterSanctuaryDataTypes.Item> {
    constructor(itemsDirectory: string) {
        super(itemsDirectory);
    }
}

export default ItemsClient;
export { ItemsClient };