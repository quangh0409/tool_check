import mongoose from "mongoose";

const Hadolint = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    column: {
        type: String,
        required: false,
    },
    file: {
        type: String,
        required: false,
    },
    level: {
        type: String,
        required: false,
    },
    line: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
})


export default mongoose.model('Hadolints', Hadolint)
