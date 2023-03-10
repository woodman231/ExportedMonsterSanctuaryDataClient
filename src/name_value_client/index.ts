import DirectoryClient from "../directory_client";

interface NameValueObject {    
    Name: string;    
    Value: number;
}

interface INameValueClient<Type extends NameValueObject> extends DirectoryClient<Type> {
    getObjectByValueAsync(value: number): Promise<Type | null>
    getObjectByNameAsync(name: string): Promise<Type | null>
}

export default abstract class NameValueClient<Type extends NameValueObject> extends DirectoryClient<Type> implements INameValueClient<Type> {
    /**
     * Creates a new instance of NameValueClient
     * @param directoryName - the directory containg the objects that have at least a {Name: string; Value: number} signature
     */
    constructor(directoryName: string) {
        super(directoryName);
    }

    /**
     * Gets an object from the directory by the object's Value property
     * @param {number} value the number value associated with objects in the directory
     * @returns {Promise<Type> | null} The object where the Value property matches the value paramater or null if one could not be found
     */
    getObjectByValueAsync = async (value: number): Promise<Type | null> => {
        let results : Type | null = null;

        const allObjectsInDirectory = await this.getAllObjectsInDirectoryAsync();
        
        for(let i=0; i<allObjectsInDirectory.length; i++) {
            if(allObjectsInDirectory[i].Value === value) {
                results = allObjectsInDirectory[i];
                break;
            }
        }        

        return results;
    }

    /**
     * Gets an object from the directory by the object's Name proeprty
     * @param {string} name - The name value associated with objects in the directory
     * @returns {Promise<Type> | null} The object where the Name property matches the name paramater or null if one could not be found
     */
    getObjectByNameAsync = async (name: string): Promise<Type | null> => {
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