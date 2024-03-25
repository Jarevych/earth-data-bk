import express, { Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { readBinaryFile } from './readBinaryFile';
const morgan = require("morgan");

const AdmZip = require('adm-zip');
const app = express();
const port = 3000;
const fs = require('fs');

// app.get('/', (req: Request, res: Response) => {
//     res.send('welcome')
// });
app.use(morgan("dev"));

app.use(fileUpload())

app.post('/upload', (req: Request, res: Response) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("no files to upload")
    };

    const file = req.files?.file as UploadedFile;

    const filePath = './grid/sst.grid';


    const tempFilePath = __dirname + '/temp' + file.name;
    file.mv(tempFilePath), (err: any) => {
        if(err) {
            return res.status(500).send(err)
        }

        const zip = new AdmZip(tempFilePath);
        zip.extractAllTo(__dirname + '/temp/extracted', true)

        fs.unlinkSync(tempFilePath);

        readBinaryFile(filePath)
        .then(() => {
            console.log('file read success')
        }).catch(error => {
            console.error('error to read file', error)
        });

        res.send('file uploaded and extracted successfully')
    }
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
