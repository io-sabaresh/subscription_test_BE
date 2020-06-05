const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const CabinSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    descriptions: String,
}, {
    timestamps: true
});


CabinSchema.index({ owner: 1 });

module.exports = mongoose.model('Cabin', CabinSchema);