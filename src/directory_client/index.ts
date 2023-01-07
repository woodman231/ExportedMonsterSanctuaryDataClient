import { Dirent, Stats } from 'fs';
import * as fs from 'fs/promises'
import path from 'path';

export interface IDirectoryClient<Type> {
    readonly directoryName: string;
    getAllFileNamesAsync(): Promise<string[]>
    getObjectFromFileByFileNameAsync(fileNameWithoutJsonExtension: string): Promise<Type | null>
    getAllObjectsInDirectoryAsync(): Promise<Type[]>
}

export default abstract class DirectoryClient<Type> implements IDirectoryClient<Type> {
    readonly directoryName: string;

    /**
     * Creates a new instance of a DirectoryClient
     * @constructor
     * @param {string} directoryName - The directory containg the objects
     */
    constructor(directoryName: string) {
        this.directoryName = directoryName;
    }

    /**
     * Returns the name of all of the files in the directory with a .json extension; however, the name will be returned without the .json extension.
     * ex: a file named "Foo.json" will be returned as "Foo".
     * @returns {string[]} - A list of file names without the json extension
     */
    getAllFileNamesAsync = async (): Promise<string[]> => {
        let results = [] as string[];

        const itemsInDirectory: Dirent[] = await fs.readdir(this.directoryName, { encoding: 'utf8', withFileTypes: true });

        /*
        const readFilePromises: Promise<void>[] = itemsInDirectory.map(async (itemInDirectory: string) => {
            if (itemInDirectory.endsWith('.json')) {
                const fullItemName: string = path.join(this.directoryName, itemInDirectory);
                const itemStats: Stats = await fs.stat(fullItemName);

                if (itemStats.isFile()) {
                    const fileNameWithoutJsonExtension = itemInDirectory.substring(0, itemInDirectory.length - 5);

                    results.push(fileNameWithoutJsonExtension);
                }
            }
        });

        await Promise.all(readFilePromises);
        */

        itemsInDirectory.forEach((itemInDirectory) => {
            if(itemInDirectory.isFile()) {
                if(itemInDirectory.name.endsWith('.json')) {
                    const fileNameWithoutJsonExtension = itemInDirectory.name.substring(0, itemInDirectory.name.length - 5);

                    results.push(fileNameWithoutJsonExtension);
                }
            }
        });

        return results;
    }

    /**
     * Return an object after reading the JSON file
     * @param {string} fileNameWithoutJsonExtension - The name of the file in the directory without the .json extension. The .json extension is implied.
     * @returns {Promise<Type> | null} Returns the object of the matching file name. Will return null if one could not be found.
     */
    getObjectFromFileByFileNameAsync = async (fileNameWithoutJsonExtension: string): Promise<Type | null> => {
        try {
            const fullFileName = path.join(this.directoryName, `${fileNameWithoutJsonExtension}.json`);
            const fileStats = await fs.stat(fullFileName);

            if(fileStats.isFile()) {
                const fileContents = await fs.readFile(fullFileName, 'utf8');
                const fileContentsAsObject = JSON.parse(fileContents) as Type

                return fileContentsAsObject;
            } else {
                throw new Error('Only able to read files');
            }
        } catch {
            return null;
        }
    }

    /**
     * Returns all objects after reading each JSON file in a directory
     * @returns {Promise<Type>} all objects in the directory after reading each file as JSON and parsing it.
     */
    getAllObjectsInDirectoryAsync = async (): Promise<Type[]> => {
        var results = [] as Type[];

        const itemsInDirectory: Dirent[] = await fs.readdir(this.directoryName, { encoding: 'utf8', withFileTypes: true });

        /*
        const readFilePromises: Promise<void>[] = itemsInDirectory.map(async (itemInDirectory) => {
            try {
                if (itemInDirectory.endsWith('.json')) {
                    const fullItemName: string = path.join(this.directoryName, itemInDirectory);
                    const itemStats: Stats = await fs.stat(fullItemName);
    
                    if (itemStats.isFile()) {
                        const fileContents = await fs.readFile(fullItemName, 'utf8');
                        const fileAsObject = JSON.parse(fileContents) as Type;
    
                        results.push(fileAsObject);
                    }
                }
            } catch {
                // Do not add it to the results if the file does not exist or could not be parsed
            }
        });

        await Promise.all(readFilePromises);
        */

        const readFilePromises: Promise<void>[] = itemsInDirectory.map(async (itemInDirectory) => {
            if(itemInDirectory.isFile()) {
                if(itemInDirectory.name.endsWith('.json')) {
                    try {
                        const fullFileName = path.join(this.directoryName, itemInDirectory.name);
                        const fileContents = await fs.readFile(fullFileName, 'utf8');
                        const fileContentsAsObject = JSON.parse(fileContents) as Type

                        results.push(fileContentsAsObject);
                    } catch {
                        // Do not add it to the results if the contents cannot be read or parsed
                    }
                }
            }
        });

        await Promise.all(readFilePromises);

        return results;
    }
}