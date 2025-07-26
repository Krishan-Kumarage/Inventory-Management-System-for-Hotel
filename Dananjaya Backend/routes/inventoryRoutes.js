const express = require('express');
const Item = require('../model/inventory_item.js'); // Adjust the path if necessary

const router = express.Router();

// Route to add a new inventory item
router.post("/addinventory", async (req, res) => {
    const { code, name, igroup, quantity, kg, cost, addDate, description } = req.body;

    const newItem = new Item({
        code,
        name,
        igroup,
        quantity,
        kg,
        cost,
        addDate,
        description,
        
    });

    try {
        await newItem.save();
        res.json({ message: "New item added" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error adding new item", details: err.message });
    }
});

// Route to get all inventory items
router.get("/getinventory", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching items", details: err.message });
    }
});

// Route to update an inventory item
router.put("/updateinventory/:id", async (req, res) => {
    const itemId = req.params.id;
    const { code, name, igroup, quantity, kg, cost, addDate, description } = req.body;

    const updateItem = {
        code,
        name,
        igroup,
        quantity,
        kg,
        cost,
        addDate,
        description,
        
    };

    console.log("Updating item with ID:", itemId);
    console.log("Incoming data:", req.body);

    try {
        const updatedItem = await Item.findByIdAndUpdate(itemId, updateItem, { new: true });
        console.log("Updated Item:", updatedItem);
        
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json({ message: "Item updated", item: updatedItem });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating item", details: err.message });
    }
});

// Route to delete an inventory item
router.delete("/deleteinventory/:id", async (req, res) => {
    const itemId = req.params.id;
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error deleting item", details: err.message });
    }
});

// Route to get a single inventory item by ID
router.get("/getinventory/:id", async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching item", details: err.message });
    }
});

module.exports = router; // CommonJS export
