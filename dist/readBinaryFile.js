"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBinaryFile = void 0;
const fs_1 = __importDefault(require("fs"));
function readBinaryFile(filePath) {
    return fs_1.default.promises.readFile(filePath)
        .then(data => {
        // Обробка даних
        console.log('File read successfully');
    })
        .catch(error => {
        console.error('Error reading file:', error);
        throw error; // Якщо потрібно прокинути помилку далі
    });
}
exports.readBinaryFile = readBinaryFile;
