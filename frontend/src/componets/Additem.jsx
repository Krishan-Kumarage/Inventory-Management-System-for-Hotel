import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/logo.png"; // Adjust the path to your logo
import Footer from "./ifooter"; // Ensure correct import casing
import Header from "./iHeader";


export default function AddItem() {
    const [inputCode, setCode] = useState("");
    const [inputName, setName] = useState("");
    const [inputIgroup, setIgroup] = useState("");
    const [inputQuantity, setQuantity] = useState("");
    const [inputKg, setKg] = useState(false);
    const [inputCost, setCost] = useState("");
    const [inputDate, setDate] = useState("");
    const [inputDescription, setDescription] = useState("");
    const [existingItem, setExistingItem] = useState(false);

    // Check if item already exists when inputCode changes
    useEffect(() => {
        if (!inputCode) return; // Skip if inputCode is empty

        async function checkExistingItem() {
            try {
                const res = await axios.get("http://localhost:8070/inventory/getinventory");
                const itemExists = res.data.some((element) => inputCode === element.code);
                setExistingItem(itemExists);
            } catch (err) {
                console.error("Error fetching items:", err.message);
            }
        }

        checkExistingItem();
    }, [inputCode]);

    // Handle form submission
    function sendData(e) {
        e.preventDefault();
    
        if (existingItem) {
            Swal.fire({
                icon: "error",
                title: "Item Code already exists!",
                text: "Please choose a different Item Code",
            });
            return;
        }
    
        const newItem = {
            code: inputCode,
            name: inputName,
            igroup: inputIgroup,
            quantity: inputQuantity,
            kg: inputKg,
            cost: inputCost,
            addDate: inputDate,
            description: inputDescription,
        };
    
        // Input validation
        if (!inputCode || !inputName || !inputDate || inputQuantity < 0 || inputCost < 0) {
            Swal.fire({
                title: "Error",
                text: !inputCode
                    ? "Please enter the item code."
                    : !inputName
                    ? "Please enter the item name."
                    : !inputDate
                    ? "Please enter the date."
                    : inputQuantity < 0
                    ? "Cannot enter negative values for quantity."
                    : "Cannot enter negative values for cost.",
                icon: "error",
            });
            return;
        }
    
        axios
            .post("http://localhost:8070/inventory/addinventory", newItem)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item Added",
                    showConfirmButton: false,
                    timer: 1500,
                });
                resetForm(); // Clear the form after success
            })
            .catch((err) => {
                console.error("Error adding item:", err.response?.data || err.message);
                Swal.fire({
                    title: "Error",
                    text: err.response?.data?.message || "An error occurred while adding the item.",
                    icon: "error",
                });
            });
    }

    // Function to reset the form fields
    function resetForm() {
        setCode("");
        setName("");
        setIgroup("");
        setQuantity("");
        setKg(false);
        setCost("");
        setDate("");
        setDescription("");
        document.getElementById("itemGroupSelect").value = "";
        document.getElementById("kg").checked = false;
    }

    return (
        <div>
        <div>
             <Header/>
        <div>
            <div
                className="add-inventory-background"
                style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    width: "600px",
                    margin: "40px auto",
                }}
            >
                <div className="col-12 text-center">
                    <img src={logo} alt="Logo" width="75" height="75" />
                    <h2 style={{ fontFamily: "inherit", fontWeight: "bold", color: "#333" }}>
                        Add New Inventory Item
                    </h2>
                </div>
                <hr style={{ borderColor: "#007bff" }} />

                {/* Input fields */}
                <form onSubmit={sendData}>
                    <div style={{ alignItems: "center" }}>
                        <div className="mb-3 row align-items-center">
                            <label
                                htmlFor="inputCode"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Item Code
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCode"
                                    style={{ width: "500px", border: "2px solid #007bff", borderRadius: "5px" }}
                                    value={inputCode}
                                    onChange={(e) => setCode(e.target.value)}
                                    aria-label="Item Code"
                                />
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label
                                htmlFor="inputName"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Item Name
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    style={{ width: "500px", border: "2px solid #007bff", borderRadius: "5px" }}
                                    value={inputName}
                                    onChange={(e) => setName(e.target.value)}
                                    aria-label="Item Name"
                                />
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label
                                htmlFor="itemGroupSelect"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Item Group
                            </label>
                            <div className="col-sm-8">
                                <select
                                    id="itemGroupSelect"
                                    className="form-select"
                                    style={{ width: "500px", border: "2px solid #007bff", borderRadius: "5px" }}
                                    onChange={(e) => setIgroup(e.target.value)}
                                    aria-label="Item Group"
                                >
                                    <option value="">Select Item Group</option>
                                    <option value="Vegetable">Vegetable</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Fish">Fish</option>
                                    <option value="Rice">Rice</option>
                                    <option value="Spices">Spices</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Cooking Equipments">Cooking Equipments</option>
                                    <option value="Soft Drinks">Soft Drinks</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label
                                htmlFor="inputQuantity"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Initial Quantity
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputQuantity"
                                    style={{ width: "300px", border: "2px solid #007bff", borderRadius: "5px" }}
                                    value={inputQuantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    aria-label="Initial Quantity"
                                />
                            </div>

                            <div className="col-sm-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="kg"
                                        checked={inputKg}
                                        onChange={(e) => setKg(e.target.checked)}
                                        aria-label="Weight in kg"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="kg"
                                        style={{ marginLeft: "5px", fontWeight: "bold", marginBottom: "0" }}
                                    >
                                        kg
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label
                                htmlFor="inputCost"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Cost
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputCost"
                                    style={{ width: "500px", border: "2px solid #007bff", borderRadius: "5px" }}
                                    value={inputCost}
                                    onChange={(e) => setCost(e.target.value)}
                                    aria-label="Cost"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="inputDate"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="inputDate"
                                style={{ width: "500px", border: "2px solid #007bff", borderRadius: "5px" }}
                                value={inputDate}
                                onChange={(e) => setDate(e.target.value)}
                                aria-label="Date"
                            />
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label
                                htmlFor="inputDescription"
                                className="col-sm-5 col-form-label"
                                style={{ fontWeight: "bold", marginBottom: "0", color: "#333" }}
                            >
                                Description
                            </label>
                            <div className="col-sm-8">
                                <textarea
                                    className="form-control"
                                    id="inputDescription"
                                    style={{ width: "500px", border: "2px solid #007bff", borderRadius: "5px" }}
                                    value={inputDescription}
                                    onChange={(e) => setDescription(e.target.value)}
                                    aria-label="Description"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "500px", fontWeight: "bold" }}
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
        </div>
        </div>
    );
}
