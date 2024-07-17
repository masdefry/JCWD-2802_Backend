import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName: string, filelimit?: number) => {

    const defaultDir = 'src/public/';

    const storage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
            const destination = defaultDir + folderName ; // src/public/Images

            // Pengecekan Directory di Public
            const isDirectoryExist = fs.existsSync(destination)
            
            if(isDirectoryExist === false){
                fs.mkdirSync(destination)
            }

            cb(null, destination);
        },

        filename: (req: Request, file: Express.Multer.File, callback: FilenameCallback) => {
            // console.log(req)
            callback(null, 'Bebas.jpg')
        },
    });

    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        console.log('fileFilter')
        cb(null, true)
    };

    const limits = { fileSize: filelimit || 1 * 1024 * 1024 };

    return multer({ storage, fileFilter, limits });
};