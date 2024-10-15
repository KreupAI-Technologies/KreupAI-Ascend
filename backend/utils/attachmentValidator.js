import { body } from "express-validator";
import Attachment from "../modules/CRM/models/attachmentModel.js";
import multer from 'multer';

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the uploads directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

// Initialize multer
const upload = multer({ storage: storage });

export const validateCreateAttachment = [upload.single('file'), // Handle file upload
[
    body('collectionTypeId')
        .notEmpty()
        .withMessage('Collection Type ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Collections') {
                throw new Error('Collection Type must belong to "Collections" status group');
            }
            return true;
        }),
    body('collectionId')
        .notEmpty()
        .withMessage('Collection ID is required')
        .custom(async (value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection ID');
            }
            // Validate that the collectionId exists in the specified collection
            const Status = mongoose.model('Status');
            const status = await Status.findById(req.body.collectionTypeId);
            if (!status) {
                throw new Error('Invalid Collection Type');
            }
            const collectionName = status.name;
            const Model = mongoose.model(collectionName);
            const exists = await Model.exists({ _id: value });
            if (!exists) {
                throw new Error(`Referenced document not found in ${collectionName} collection`);
            }
            return true;
        }),
]];
