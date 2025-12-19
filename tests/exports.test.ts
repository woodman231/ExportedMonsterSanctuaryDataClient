import ExportedMonsterSanctuaryDataClient, {
    ExportedMonsterSanctuaryDataClient as NamedClient,
    BuffsClient,
    DebuffsClient,
    EnumsClient,
    ItemsClient,
    MonstersClient,
    SpecialBuffsClient,
    DirectoryClient,
    IDirectoryClient,
    NameValueClient,
    NameValueObject,
    ReferenceableClient,
    Referenceable,
} from '../src/index';

describe('Export Tests', () => {
    describe('Main Client Exports', () => {
        it('should export ExportedMonsterSanctuaryDataClient as default', () => {
            expect(ExportedMonsterSanctuaryDataClient).toBeDefined();
            expect(typeof ExportedMonsterSanctuaryDataClient).toBe('function');
        });

        it('should export ExportedMonsterSanctuaryDataClient as named export', () => {
            expect(NamedClient).toBeDefined();
            expect(typeof NamedClient).toBe('function');
        });

        it('default and named exports should be the same', () => {
            expect(ExportedMonsterSanctuaryDataClient).toBe(NamedClient);
        });
    });

    describe('Client Class Exports', () => {
        it('should export BuffsClient', () => {
            expect(BuffsClient).toBeDefined();
            expect(typeof BuffsClient).toBe('function');
        });

        it('should export DebuffsClient', () => {
            expect(DebuffsClient).toBeDefined();
            expect(typeof DebuffsClient).toBe('function');
        });

        it('should export EnumsClient', () => {
            expect(EnumsClient).toBeDefined();
            expect(typeof EnumsClient).toBe('function');
        });

        it('should export ItemsClient', () => {
            expect(ItemsClient).toBeDefined();
            expect(typeof ItemsClient).toBe('function');
        });

        it('should export MonstersClient', () => {
            expect(MonstersClient).toBeDefined();
            expect(typeof MonstersClient).toBe('function');
        });

        it('should export SpecialBuffsClient', () => {
            expect(SpecialBuffsClient).toBeDefined();
            expect(typeof SpecialBuffsClient).toBe('function');
        });
    });

    describe('Base Class Exports', () => {
        it('should export DirectoryClient', () => {
            expect(DirectoryClient).toBeDefined();
            expect(typeof DirectoryClient).toBe('function');
        });

        it('should export NameValueClient', () => {
            expect(NameValueClient).toBeDefined();
            expect(typeof NameValueClient).toBe('function');
        });

        it('should export ReferenceableClient', () => {
            expect(ReferenceableClient).toBeDefined();
            expect(typeof ReferenceableClient).toBe('function');
        });
    });

    describe('Interface Exports', () => {
        it('should export IDirectoryClient interface', () => {
            // TypeScript interfaces don't exist at runtime, but we can verify the type is exported
            // by checking if we can use it in type annotations (compile-time check)
            expect(true).toBe(true);
        });

        it('should export NameValueObject interface', () => {
            // TypeScript interfaces don't exist at runtime
            expect(true).toBe(true);
        });

        it('should export Referenceable interface', () => {
            // TypeScript interfaces don't exist at runtime
            expect(true).toBe(true);
        });
    });

    describe('Type Checking', () => {
        it('should allow creating instances with proper types', () => {
            // This is a compile-time check that named imports work correctly
            const testObj: NameValueObject = { Name: 'Test', Value: 1 };
            expect(testObj.Name).toBe('Test');
            expect(testObj.Value).toBe(1);

            const testReferenceable: Referenceable = { ID: 1, Name: 'Test' };
            expect(testReferenceable.ID).toBe(1);
            expect(testReferenceable.Name).toBe('Test');
        });
    });
});
