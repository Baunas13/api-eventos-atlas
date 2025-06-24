import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const uniqueSuffix = crypto.randomBytes(6).toString('hex');
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    })
};
