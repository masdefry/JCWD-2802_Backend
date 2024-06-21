import fs from 'fs';

export const readFileSync = () => {
    return JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
}