const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        igroup: { type: String, required: true },
        quantity: { type: Number, required: true },
        kg: { type: Boolean, default: false },
        cost: { type: Number, required: true },
        addDate: { type: Date, required: true },
        description: { type: String },
        
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
