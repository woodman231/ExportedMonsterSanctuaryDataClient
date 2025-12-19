# Exported Monster Sanctuary Data Client

Makes using the following packages easier to use. These packages should be considered peer dependencies:
- [https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydata](https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydata)
- [https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydatatypes](https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydatatypes)

Unless otherwise specified the client will look for the Exported Monster Sanctuary Data in (cwd)/node_modules/@woodman231/exportedmonstersanctuarydata. However, you may use your own directory name if you have the data in a different directory.

## Installation

```bash
npm install @woodman231/exportedmonstermanctuarydataclient
```

## Import Methods

This package supports both ESM and CommonJS module formats and provides multiple import patterns to suit your needs:

### Option 1: Default Import (Backward Compatible)

The traditional way to import the client, works in both ESM and CommonJS:

```typescript
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";

const main = async () => {
    const myClient = new ExportedMonsterSanctuaryDataClient();

    const debuffFileNames = await myClient.debuffsClient.getAllFileNamesAsync();
    debuffFileNames.forEach((debuffFileName) => {
        console.log(debuffFileName);
    });

    const buffObjects = await myClient.buffsClient.getAllObjectsInDirectoryAsync();
    buffObjects.forEach((buffObject) => {
        console.log(buffObject);
    });
}

main();
```

### Option 2: Named Import (Modern ESM)

Import the main client class by name for better tree-shaking and modern syntax:

```typescript
import { ExportedMonsterSanctuaryDataClient } from "@woodman231/exportedmonstermanctuarydataclient";

const main = async () => {
    const myClient = new ExportedMonsterSanctuaryDataClient();
    
    const monsters = await myClient.monstersClient.getAllObjectsInDirectoryAsync();
    console.log(`Found ${monsters.length} monsters`);
}

main();
```

### Option 3: Direct Client Imports (Tree-Shakeable)

Import only the specific client classes you need. This enables better tree-shaking and reduces bundle size:

```typescript
import { BuffsClient, DebuffsClient } from "@woodman231/exportedmonstermanctuarydataclient";
import path from "path";

const main = async () => {
    // Use clients directly without the main wrapper
    const dataPath = path.join(process.cwd(), 'node_modules', '@woodman231', 'exportedmonstersanctuarydata');
    
    const buffsClient = new BuffsClient(path.join(dataPath, 'Buffs'));
    const buffs = await buffsClient.getAllObjectsInDirectoryAsync();
    
    const debuffsClient = new DebuffsClient(path.join(dataPath, 'Debuffs'));
    const debuffs = await debuffsClient.getAllObjectsInDirectoryAsync();
    
    console.log(`Found ${buffs.length} buffs and ${debuffs.length} debuffs`);
}

main();
```

### Option 4: Base Classes and Interfaces

For advanced use cases, you can extend base classes or use interfaces for custom implementations:

```typescript
import { 
    DirectoryClient, 
    IDirectoryClient,
    NameValueClient,
    NameValueObject,
    ReferenceableClient,
    Referenceable 
} from "@woodman231/exportedmonstermanctuarydataclient";

// Example: Create a custom client extending NameValueClient
class MyCustomClient extends NameValueClient<MyCustomType> {
    constructor(directory: string) {
        super(directory);
    }
    
    // Add custom methods...
}

// Use interfaces for type checking
function processNameValue(obj: NameValueObject) {
    console.log(`${obj.Name}: ${obj.Value}`);
}
```

## Available Clients

The package exports the following client classes:

- `ExportedMonsterSanctuaryDataClient` - Main client with all sub-clients
- `BuffsClient` - For accessing buff data
- `DebuffsClient` - For accessing debuff data  
- `EnumsClient` - For accessing enum data
- `ItemsClient` - For accessing item data
- `MonstersClient` - For accessing monster data
- `SpecialBuffsClient` - For accessing special buff data

## Base Classes

For advanced usage, the following base classes are exported:

- `DirectoryClient<Type>` - Abstract base for directory-based clients
- `NameValueClient<Type>` - Abstract base for name-value clients (extends DirectoryClient)
- `ReferenceableClient<Type>` - Abstract base for ID/Name referenceable clients (extends DirectoryClient)

## Interfaces

TypeScript interfaces for type checking:

- `IDirectoryClient<Type>` - Interface for directory clients
- `NameValueObject` - Interface for objects with Name and Value properties
- `Referenceable` - Interface for objects with ID and Name properties

 ## Looking for a sample web app that uses this client?
 Check out the [ExportedMonsterSanctuaryDataExplorer GitHub repository](https://github.com/woodman231/ExportedMonsterSanctuaryDataExplorer) or the running site @ [https://woodman231.github.io/ExportedMonsterSanctuaryDataExplorer](https://woodman231.github.io/ExportedMonsterSanctuaryDataExplorer)

DISCLAIMER: This package was made by a fan of the game. I am not associated with [Moi Rai Games](https://monster-sanctuary.com/) the developer, nor [Team 17](https://www.team17.com/) the distributor.