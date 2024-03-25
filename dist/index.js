"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const readBinaryFile_1 = require("./readBinaryFile");
const morgan = require("morgan");
const AdmZip = require('adm-zip');
const app = (0, express_1.default)();
const port = 3000;
const fs = require('fs');
// app.get('/', (req: Request, res: Response) => {
//     res.send('welcome')
// });
app.use(morgan("dev"));
app.use((0, express_fileupload_1.default)());
app.post('/upload', (req, res) => {
    var _a;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("no files to upload");
    }
    ;
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const filePath = './sst.grid';
    const tempFilePath = __dirname + '/temp' + file.name;
    file.mv(tempFilePath), (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        const zip = new AdmZip(tempFilePath);
        zip.extractAllTo(__dirname + '/temp/extracted', true);
        fs.unlinkSync(tempFilePath);
        (0, readBinaryFile_1.readBinaryFile)(filePath)
            .then(() => {
            console.log('file read success');
        }).catch(error => {
            console.error('error to read file', error);
        });
        res.send('file uploaded and extracted successfully');
    };
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
