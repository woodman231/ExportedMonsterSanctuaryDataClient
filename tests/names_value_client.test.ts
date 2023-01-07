import { defaultDirectoryStat, defaultFileStat, defaultFileDirent, defaultDirectoryDirent } from "../test_utils";
import sinon from "sinon";
import fs from "fs";
import path from 'path';
import NameValueClient from "../src/name_value_client"
import { assert } from "console";

interface MyNameValueObject {
    Name: string;
    Value: number;
}

describe('NameValueClient abstract class', () => {
    describe('getObjectByValueAsync', () => {
        it('returns the object where the Value property matches the value paramater (mocking the file system)', async () => {
            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');
            readdirStub.resolves([
                defaultFileDirent('foo.json'),
                defaultFileDirent('bar.json'),
                defaultFileDirent('baz.json'),
                defaultFileDirent('notme.notjson'),
                defaultFileDirent('cannotbeparsed.json'),
                defaultDirectoryDirent('notmeimadirectory.json')
            ]);

            const readFileStub: sinon.SinonStub = sinon.stub(fs.promises, 'readFile');
            readFileStub.withArgs(path.join(myTestFolderPath, 'foo.json'), 'utf8').resolves('{"Name":"Zero", "Value":0}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'bar.json'), 'utf8').resolves('{"Name":"One", "Value":1}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'baz.json'), 'utf8').resolves('{"Name":"Two", "Value":2}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'cannotbeparsed.json'), 'utf8').resolves('plain text');

            const objectsResult = await myTestNameValueClient.getObjectByValueAsync(1);

            assert(readdirStub.called);
            expect(readFileStub.callCount).toBe(4);

            expect(objectsResult).toStrictEqual({ Name: "One", Value: 1 });

            readdirStub.restore();
            readFileStub.restore();
        });

        it('returns the object where the Value property matches the value paramater (mocking getAllObjectsInDirectoryAsync)', async () => {
            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { Name: "Zero", Value: 0 },
                { Name: "One", Value: 1 },
                { Name: "Two", Value: 2 }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByValueAsync(1);

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toStrictEqual({ Name: "One", Value: 1 });

        });

        it('returns null if the value cannot be found after parsing all of the objects in the directory', async () => {
            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const readdirStub: sinon.SinonStub = sinon.stub(fs.promises, 'readdir');
            readdirStub.resolves([
                defaultFileDirent('foo.json'),
                defaultFileDirent('bar.json'),
                defaultFileDirent('baz.json'),
                defaultFileDirent('notme.notjson'),
                defaultFileDirent('cannotbeparsed.json'),
                defaultDirectoryDirent('notmeimadirectory.json')
            ]);

            const readFileStub: sinon.SinonStub = sinon.stub(fs.promises, 'readFile');
            readFileStub.withArgs(path.join(myTestFolderPath, 'foo.json'), 'utf8').resolves('{"Name":"Zero", "Value":0}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'bar.json'), 'utf8').resolves('{"Name":"One", "Value":1}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'baz.json'), 'utf8').resolves('{"Name":"Two", "Value":2}');
            readFileStub.withArgs(path.join(myTestFolderPath, 'cannotbeparsed.json'), 'utf8').resolves('plain text');

            const objectsResult = await myTestNameValueClient.getObjectByValueAsync(3);

            assert(readdirStub.called);
            expect(readFileStub.callCount).toBe(4);

            expect(objectsResult).toBe(null);

            readdirStub.restore();
            readFileStub.restore();
        });

        it('throws ENOENT if the directory provided does not exist', async () => {

            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const expectedException: NodeJS.ErrnoException = {
                message: "directory does not exist",
                name: "",
                code: "ENOENT",
                path: myTestFolderPath
            };

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.rejects(expectedException);

            try {
                await myTestNameValueClient.getObjectByValueAsync(3);
            } catch (err) {
                expect(err.code).toBe('ENOENT');
            }

            assert(getAllObjectsInDirectoryAsyncStub.called);

            getAllObjectsInDirectoryAsyncStub.restore();
        });
    });

    describe('getObjectByNameAsync', () => {
        it('returns the object where the Name property matches the name paramater', async () => {
            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { Name: "Zero", Value: 0 },
                { Name: "One", Value: 1 },
                { Name: "Two", Value: 2 }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByNameAsync("One");

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toStrictEqual({ Name: "One", Value: 1 });
        });

        it('returns null if the value cannot be found after parsing all of the objects in the directory', async () => {
            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { Name: "Zero", Value: 0 },
                { Name: "One", Value: 1 },
                { Name: "Two", Value: 2 }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByNameAsync("Three");

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toBe(null);
        });

        it('throws ENOENT if the directory provided does not exist', async () => {

            class TestNameValueClient extends NameValueClient<MyNameValueObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestNameValueClient(myTestFolderPath);

            const expectedException: NodeJS.ErrnoException = {
                message: "directory does not exist",
                name: "",
                code: "ENOENT",
                path: myTestFolderPath
            };

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.rejects(expectedException);

            try {
                await myTestNameValueClient.getObjectByNameAsync('Three');
            } catch (err) {
                console.log(err);
                expect(err.code).toBe('ENOENT');
            }

            assert(getAllObjectsInDirectoryAsyncStub.called);

            getAllObjectsInDirectoryAsyncStub.restore();
        });
    });
});