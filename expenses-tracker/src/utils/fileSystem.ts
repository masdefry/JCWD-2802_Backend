import fs from 'fs';

export const readFileSync = () => {
    return JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
}

export const writeFileSync = (data: any) => {
    fs.writeFileSync('./db/db.json', JSON.stringify(data))
}