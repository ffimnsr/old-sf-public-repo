import mongoose from "mongoose";

export type KycDocumentModel = mongoose.Document & {
    kycDocumentType: mongoose.Schema.Types.ObjectId,
    company: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    documentNo: number,
    description: string,
    documentType: string,
    file: string,
    expirationDate: Date,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean
};

const KycDocumentSchema = new mongoose.Schema({
    kycDocumentType: { type: mongoose.Schema.Types.ObjectId, ref: "KycDocumentType" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    documentNo: Number,
    description: String,
    documentType: String,
    file: String,
    expirationDate: Date,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: Boolean,
}, { timestamps: true });

const KycDocument: mongoose.Model<KycDocumentModel> = mongoose.model<KycDocumentModel>("KycDocument", KycDocumentSchema, "kyc_documents");
export default KycDocument;
