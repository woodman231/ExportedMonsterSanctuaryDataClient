import sinon from "sinon";
import path from 'path';
import ReferenceableClient from "../src/referenceable_client"

interface MyReferenceableObject {
    ID: number;
    Name: string;
    SomeotherProp: string;
}

describe('ReferenceableClient', () => {
    describe('getObjectByIDPropertyAsync', () => {
        it('returns an object that has an ID property that matches the id paramater that was passed in', async () => {
            class TestReferenceableClient extends ReferenceableClient<MyReferenceableObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestReferenceableClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { ID: 0, Name: "Zero", SomeotherProp: "foo" },
                { ID: 1, Name: "One", SomeotherProp: "bar" },
                { ID: 2, Name: "Two", SomeOtherProp: "baz" }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByIDPropertyAsync(1);

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toStrictEqual({ ID: 1, Name: "One", SomeotherProp: "bar" });
        });

        it('returns null if no objects has an ID property that matches the id paramater that was passed in', async () => {
            class TestReferenceableClient extends ReferenceableClient<MyReferenceableObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestReferenceableClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { ID: 0, Name: "Zero", SomeotherProp: "foo" },
                { ID: 1, Name: "One", SomeotherProp: "bar" },
                { ID: 2, Name: "Two", SomeOtherProp: "baz" }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByIDPropertyAsync(3);

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toBe(null);
        })
    })

    describe('getObjectByNamePropertyAsync', () => {
        it('returns an object that has a Name property that matches the name paramater that was passed in', async () => {
            class TestReferenceableClient extends ReferenceableClient<MyReferenceableObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestReferenceableClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { ID: 0, Name: "Zero", SomeotherProp: "foo" },
                { ID: 1, Name: "One", SomeotherProp: "bar" },
                { ID: 2, Name: "Two", SomeOtherProp: "baz" }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByNamePropertyAsync('One');

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toStrictEqual({ ID: 1, Name: "One", SomeotherProp: "bar" });
        })

        it('returns null if none of the object have a Name property that matches the name paramater that was passed in', async () => {
            class TestReferenceableClient extends ReferenceableClient<MyReferenceableObject> {
            }

            const myTestFolderPath = path.join('foo', 'bar');
            const myTestNameValueClient = new TestReferenceableClient(myTestFolderPath);

            const getAllObjectsInDirectoryAsyncStub: sinon.SinonStub = sinon.stub(myTestNameValueClient, 'getAllObjectsInDirectoryAsync');
            getAllObjectsInDirectoryAsyncStub.resolves([
                { ID: 0, Name: "Zero", SomeotherProp: "foo" },
                { ID: 1, Name: "One", SomeotherProp: "bar" },
                { ID: 2, Name: "Two", SomeOtherProp: "baz" }
            ]);

            const objectsResult = await myTestNameValueClient.getObjectByNamePropertyAsync('Three');

            expect(getAllObjectsInDirectoryAsyncStub.called).toBe(true);
            expect(objectsResult).toBe(null);
        })
    })

})