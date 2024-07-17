import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName: string, fileAccepted: string[], filelimit: number) => {

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
            const uniqueName = Date.now()
            const splitOriginalName = file.originalname.split('.') // [xxx, png]
            const fileExtension = splitOriginalName[splitOriginalName.length-1]
            const fileName = `${filePrefix}-${uniqueName}.${fileExtension}` // IMG-Date.now().fileExtension
            callback(null, fileName)
        },
    });

    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const splitOriginalName = file.originalname.split('.') // [xxx, png]
        const fileExtension = splitOriginalName[splitOriginalName.length-1]

        if(fileAccepted.includes(fileExtension)) return cb(null, true)

        cb(new Error(`File Not Accepted. File Allowed ${fileAccepted.join(', ')}`))
    };

    return multer({ storage, fileFilter, limits: {fileSize: filelimit} });
};