import path from 'path';
import ExportedMonsterSanctuaryDataClient from '../src/index'

describe('testing index file', () => {
    test('providing no paramater to constructor makes the default path cwd, node_modules, @woodman231, exportedmonstersanctuarydata', () => {
        const testExportedMonstersanctuaryDataClient = new ExportedMonsterSanctuaryDataClient();

        const expectedMonstersPath = path.join(process.cwd(), 'node_modules', '@woodman231', 'exportedmonstersanctuarydata', 'Monsters');

        expect(testExportedMonstersanctuaryDataClient.monstersClient.directoryName).toBe(expectedMonstersPath);
    });

    test('providing a paramater to the constructor makes the default path the provided path', () => {
        const myCustomBasePath = path.join('foo', 'bar');

        const testExportedMonstersanctuaryDataClient = new ExportedMonsterSanctuaryDataClient(myCustomBasePath);

        const expectedMonstersPath = path.join('foo', 'bar', 'Monsters');

        expect(testExportedMonstersanctuaryDataClient.monstersClient.directoryName).toBe(expectedMonstersPath);
    })
})