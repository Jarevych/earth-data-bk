import fs, { readFile } from 'fs';

export function readBinaryFile(filePath: string): Promise<void> {
    return fs.promises.readFile(filePath)
        .then(data => {
            // Обробка даних
            console.log('File read successfully');
        })
        .catch(error => {
            console.error('Error reading file:', error);
            throw error; // Якщо потрібно прокинути помилку далі
        });
}




