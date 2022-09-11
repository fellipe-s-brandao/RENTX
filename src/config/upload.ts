import multer from "multer";
import { resolve } from "path";
import crypto from "node:crypto"

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const identificador = crypto.randomBytes(16).toString("hex");
                    const fileName = `${identificador}.${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        }
    }
}