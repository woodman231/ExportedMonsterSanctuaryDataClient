import { Stats, Dirent } from 'fs';

export const defaultFileDirent = (fileName: string): Dirent => {
    return {
        name: fileName,
        isBlockDevice: () => { return false; },
        isCharacterDevice: () => { return false; },
        isDirectory: () => { return false; },
        isFIFO: () => { return false },
        isFile: () => { return true },
        isSocket: () => { return false },
        isSymbolicLink: () => { return false }
    }
}

export const defaultDirectoryDirent = (directoryName: string): Dirent => {
    return {
        name: directoryName,
        isBlockDevice: () => { return false; },
        isCharacterDevice: () => { return false; },
        isDirectory: () => { return true; },
        isFIFO: () => { return false },
        isFile: () => { return false },
        isSocket: () => { return false },
        isSymbolicLink: () => { return false }
    }
}

export const defaultFileStat: Stats = {
    atime: new Date(),
    atimeMs: 0,
    birthtime: new Date(),
    birthtimeMs: 0,
    blksize: 0,
    blocks: 0,
    ctime: new Date(),
    ctimeMs: 0,
    dev: 0,
    gid: 0,
    ino: 0,
    mode: 0,
    mtime: new Date(),
    mtimeMs: 0,
    nlink: 0,
    rdev: 0,
    size: 0,
    uid: 0,
    isBlockDevice: () => { return false; },
    isCharacterDevice: () => { return false; },
    isDirectory: () => { return false; },
    isFIFO: () => { return false },
    isFile: () => { return true },
    isSocket: () => { return false },
    isSymbolicLink: () => { return false },
}

export const defaultDirectoryStat: Stats = {
    atime: new Date(),
    atimeMs: 0,
    birthtime: new Date(),
    birthtimeMs: 0,
    blksize: 0,
    blocks: 0,
    ctime: new Date(),
    ctimeMs: 0,
    dev: 0,
    gid: 0,
    ino: 0,
    mode: 0,
    mtime: new Date(),
    mtimeMs: 0,
    nlink: 0,
    rdev: 0,
    size: 0,
    uid: 0,
    isBlockDevice: () => { return false },
    isCharacterDevice: () => { return false },
    isDirectory: () => { return true },
    isFIFO: () => { return false },
    isFile: () => { return false },
    isSocket: () => { return false },
    isSymbolicLink: () => { return false },
}