import { Dirent, Stats } from 'fs';
import * as fs from 'fs/promises'
import path from 'path';
import DirectoryClient from '../src/directory_client'

jest.mock('fs/promises');

const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

const defaultFileDirent = (fileName: string): Dirent => {
    return {
        name: fileName,
        isFile: () => { return true },
        isDirectory: () => { return false },
        isBlockDevice: () => { return false },
        isCharacterDevice: () => { return false },
        isSymbolicLink: () => { return false },
        isFIFO: () => { return false },
        isSocket: () => { return false }
    }
}

const defaultFileStat = (): Stats => {
    return {
        isFile: () => { return false; },
        isDirectory: () => { return false },
        isBlockDevice: () => { return false; },
        isCharacterDevice: () => { return false; },
        isSymbolicLink: () => { return false; },
        isFIFO: () => { return false; },
        isSocket: () => { return false; },

        dev: 0,
        ino: 0,
        mode: 0,
        nlink: 0,
        uid: 0,
        gid: 0,
        rdev: 0,
        size: 0,
        blksize: 0,
        blocks: 0,
        atimeMs: 0,
        mtimeMs: 0,
        ctimeMs: 0,
        birthtimeMs: 0,
        atime: new Date(),
        mtime: new Date(),
        ctime: new Date(),
        birthtime: new Date(),
    }
}

describe('testing directory_client file', () => {
    test('getAllFileNamesAsync returns an empty array when no files exist in the directory', async () => {
        class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
        }

        const myTestFolderPath = path.join('foo', 'bar');
        const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

        // mockFS.readdir.mockResolvedValue([defaultFileDirent('foo.json'), defaultFileDirent('bar.json'), defaultFileDirent('notme.notjson')]);
        mockFS.readdir.mockResolvedValue([]);
        mockFS.stat.mockResolvedValue(defaultFileStat());

        expect(myTestDirectoryClient.directoryName).toBe(myTestFolderPath);

        const filesResult = await myTestDirectoryClient.getAllFileNamesAsync();

        expect(filesResult).toStrictEqual([]);
    });

    test('getAllFileNamesAsync returns only the files that end with .json in the directory', async () => {
        class TestDirectoryClient extends DirectoryClient<{ ID: number; name: string }> {
        }

        const myTestFolderPath = path.join('foo', 'bar');
        const myTestDirectoryClient = new TestDirectoryClient(myTestFolderPath);

        mockFS.readdir.mockResolvedValue([defaultFileDirent('foo.json'), defaultFileDirent('bar.json'), defaultFileDirent('notme.notjson')]);
        mockFS.stat.mockResolvedValue(defaultFileStat());

        expect(myTestDirectoryClient.directoryName).toBe(myTestFolderPath);

        const filesResult = await myTestDirectoryClient.getAllFileNamesAsync();

        expect(filesResult).toStrictEqual(['foo', 'bar']);
    });
});