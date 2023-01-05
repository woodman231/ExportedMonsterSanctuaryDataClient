import DirectoryClient from "../directory_client";

interface Referenceable {
    ID: number;
    Name: string;    
}

interface IReferenceableClient<Type extends Referenceable> extends DirectoryClient<Type> {
    getObjectByIDPropertyAsync(id: number): Promise<Type | null>
    getObjectByNamePropertyAsync(name: string): Promise<Type | null>
}

export default abstract class ReferenceableClient<Type extends Referenceable> extends DirectoryClient<Type> implements IReferenceableClient<Type> {
    /**
     * Creates a new instance of ReferenceableClient
     * @param {string} directoryName - The name of the directory where the referenceables are. A referenceable is valid if the objects in the directory match the {ID: number; Name: string} signature
     */
    constructor(directoryName: string) {
        super(directoryName);
    }

    /**
     * Gets an object by the object's ID proeprty
     * @param {number} id - The ID property value to seek for in the directory of objects
     * @returns {Promise<Type> | null} The object that has an ID property that matches the id paramater. Returns null if an object could not be found.
     */
    getObjectByIDPropertyAsync = async (id: number): Promise<Type | null> => {
        let results : Type | null = null;

        const allObjectsInDirectory = await this.getAllObjectsInDirectoryAsync();
        
        for(let i=0; i<allObjectsInDirectory.length; i++) {
            if(allObjectsInDirectory[i].ID === id) {
                results = allObjectsInDirectory[i];
                break;
            }
        }        

        return results;
    }

    /**
     * Gets an object by the object's Name property
     * @param {string} name - The Name property value to seek for in the directory of objects
     * @returns {Promise<Type> | null} The object that has an Name property that matches the name paramater. Returns null if an object could not be found.
     */
    getObjectByNamePropertyAsync = async (name: string): Promise<Type | null> => {
        let results : Type | null = null;

        const allObjectsInDirectory = await this.getAllObjectsInDirectoryAsync();
        
        for(let i=0; i<allObjectsInDirectory.length; i++) {
            if(allObjectsInDirectory[i].Name === name) {
                results = allObjectsInDirectory[i];
                break;
            }
        }        

        return results;
    }

}