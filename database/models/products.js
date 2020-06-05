const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ProductSchema = new Schema({
    cabinId: {
        type: ObjectId,
        required: true,
        ref: "Cabin"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    cost: {
        value: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            trim: true,
            default: "INR"
        }
    }
},{
    timestamps: true
});

ProductSchema.index({ cabinId: 1 });

module.exports = mongoose.model("Product", ProductSchema);
