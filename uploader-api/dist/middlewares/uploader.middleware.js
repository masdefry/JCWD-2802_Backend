"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const uploader = (filePrefix, folderName, filelimit) => {
    const defaultDir = 'src/public/';
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const destination = defaultDir + folderName; // src/public/Images
            // Pengecekan Directory di Public
            const isDirectoryExist = fs_1.default.existsSync(destination);
            if (isDirectoryExist === false) {
                fs_1.default.mkdirSync(destination);
            }
            cb(null, destination);
        },
        filename: (req, file, callback) => {
            const uniqueName = Date.now();
            const splitOriginalName = file.originalname.split('.'); // [xxx, png]
            const fileExtension = splitOriginalName[splitOriginalName.length - 1];
            const fileName = `${filePrefix}-${uniqueName}.${fileExtension}`; // IMG-Date.now().fileExtension
            callback(null, fileName);
        },
    });
    const fileFilter = (req, file, cb) => {
        console.log('fileFilter');
        cb(null, true);
    };
    const limits = { fileSize: filelimit || 1 * 1024 * 1024 };
    return (0, multer_1.default)({ storage, fileFilter, limits });
};
exports.uploader = uploader;
