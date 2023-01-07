import { defaultDirectoryStat, defaultFileStat, defaultFileDirent, defaultDirectoryDirent } from "../test_utils";
import sinon from "sinon";
import fs from "fs";
import path from 'path';
import DirectoryClient from '../src/directory_client'

describe('DirectoryClient abstract class', () => {

    describe('getAllFileNamesAsync', () => {
        it('returns an empty array if there are no files in the directory', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');
            readdirStub.resolves([]);

            const filesResult = await myTestDirectoryClient.getAllFileNamesAsync();

            expect(filesResult).toStrictEqual([]);

            readdirStub.restore();
        });

        it('returns only the files that end with .json in the directory', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');            
            readdirStub.resolves([
                defaultFileDirent('foo.json'), 
                defaultFileDirent('bar.json'), 
                defaultFileDirent('notme.notjson'), 
                defaultDirectoryDirent('notmeimadirectory'),
                defaultDirectoryDirent('notmeimadirectory.json')
            ]);            

            expect(myTestDirectoryClient.directoryName).toBe(myTestFolderPath);

            const filesResult = await myTestDirectoryClient.getAllFileNamesAsync();

            expect(readdirStub.called).toBe(true);

            expect(filesResult).toStrictEqual(['foo', 'bar']);

            readdirStub.restore();            
        });

        it('throws ENOENT if the directory provided does not exist', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const expectedException: NodeJS.ErrnoException = {
                message: "directory does not exist",
                name: "",
                code: "ENOENT",
                path: myTestFolderPath
            }

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');
            readdirStub.rejects(expectedException);

            try {
                await myTestDirectoryClient.getAllFileNamesAsync();
            } catch (err) {
                expect(err.code).toBe('ENOENT');
            }

            readdirStub.restore();
        });
    });

    describe('getObjectFromFileByFileNameAsync', () => {
        it('returns an object matching the type given as a type paramater', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const fileStatStub: sinon.SinonStub = sinon.stub(fs.promises, 'stat');
            fileStatStub.withArgs(path.join(myTestFolderPath, 'foo.json')).resolves(defaultFileStat);

            const readFileStub: sinon.SinonStub = sinon.stub(fs.promises, 'readFile');
            readFileStub.withArgs(path.join(myTestFolderPath, 'foo.json'), 'utf8').resolves('{"ID":1, "name":"Name"}');

            const expectedObject = {
                ID: 1,
                name: "Name"
            };

            const returnedObject = await myTestDirectoryClient.getObjectFromFileByFileNameAsync('foo');

            expect(readFileStub.called).toBe(true);
            expect(returnedObject).toStrictEqual(expectedObject);

            fileStatStub.restore();
            readFileStub.restore();
        });

        it('returns null if the provided file name does not exist', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const expectedException: NodeJS.ErrnoException = {
                message: "file or directory does not exist",
                name: "",
                code: "ENOENT",
                path: path.join(myTestFolderPath, 'baz.json')
            };

            const fileStatStub: sinon.SinonStub = sinon.stub(fs.promises, 'stat');
            fileStatStub.withArgs(path.join(myTestFolderPath, 'baz.json')).resolves(defaultFileStat);

            const readFileStub: sinon.SinonStub = sinon.stub(fs.promises, 'readFile');
            readFileStub.withArgs(path.join(myTestFolderPath, 'baz.json'), 'utf8').rejects(expectedException);

            const returnedObject = await myTestDirectoryClient.getObjectFromFileByFileNameAsync('baz');

            expect(fileStatStub.called).toBe(true);
            expect(readFileStub.called).toBe(true);
            expect(returnedObject).toBe(null);

            fileStatStub.restore();
            readFileStub.restore();
        });

        it('returns null if the provided file cannot be parsed as JSON', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);            

            const fileStatStub: sinon.SinonStub = sinon.stub(fs.promises, 'stat');
            fileStatStub.withArgs(path.join(myTestFolderPath, 'baz.json')).resolves(defaultFileStat);

            const readFileStub: sinon.SinonStub = sinon.stub(fs.promises, 'readFile');
            readFileStub.withArgs(path.join(myTestFolderPath, 'baz.json'), 'utf8').resolves('plain text');

            const returnedObject = await myTestDirectoryClient.getObjectFromFileByFileNameAsync('baz');

            expect(fileStatStub.called).toBe(true);
            expect(readFileStub.called).toBe(true);
            expect(returnedObject).toBe(null);

            fileStatStub.restore();
            readFileStub.restore();            
        })
    });

    describe('getAllObjectsInDirectoryAsync', () => {
        it('returns an empty array when the directory has no files', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');
            readdirStub.resolves([]);

            const objectsResult = await myTestDirectoryClient.getAllObjectsInDirectoryAsync();

            expect(objectsResult).toStrictEqual([]);

            readdirStub.restore();
        });

        it('returns an array of objects of type after reading each json file and parsing the file to json', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');            
            readdirStub.resolves([
                defaultFileDirent('foo.json'), 
                defaultFileDirent('bar.json'), 
                defaultFileDirent('cannotbeparsed.json'), 
                defaultFileDirent('notme.notjson'), 
                defaultDirectoryDirent('notmeimadirectory'),
                defaultDirectoryDirent('notmeimadirectory.json')
            ]);

            const readFileStub: sinon.SinonStub = sinon.stub(fs.promises, 'readFile');
            readFileStub.withArgs(path.join(myTestFolderPath, 'foo.json'), 'utf8').resolves('{"ID":1, "name":"Foo"}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'bar.json'), 'utf8').resolves('{"ID":2, "name":"Bar"}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'cannotbeparsed.json'), 'utf8').resolves('plain text');

            const objectsResult = await myTestDirectoryClient.getAllObjectsInDirectoryAsync();

            expect(readFileStub.called).toBe(true);
            expect(readFileStub.callCount).toBe(3);
            expect(objectsResult).toStrictEqual([{ ID: 1, name: "Foo" }, { ID: 2, name: "Bar" }]);

            readdirStub.restore();            
            readFileStub.restore();
        });

        it('throws ENOENT if the directory provided does not exist', async () => {
            class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
            };

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

            const expectedException: NodeJS.ErrnoException = {
                message: "directory does not exist",
                name: "",
                code: "ENOENT",
                path: myTestFolderPath
            }

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');
            readdirStub.rejects(expectedException);

            try {
                await myTestDirectoryClient.getAllObjectsInDirectoryAsync();
            } catch (err) {
                expect(err.code).toBe('ENOENT');
            }

            readdirStub.restore();
        });
    });
});
