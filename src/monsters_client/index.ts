import ReferenceableClient from "../referenceable_client";
import { ExportedMonsterSanctuaryDataTypes } from '@woodman231/exportedmonstersanctuarydatatypes'

class MonstersClient extends ReferenceableClient<ExportedMonsterSanctuaryDataTypes.Monster> {
    constructor(monstersDirectory: string) {
        super(monstersDirectory);
    }
}

export default MonstersClient;
export { MonstersClient };