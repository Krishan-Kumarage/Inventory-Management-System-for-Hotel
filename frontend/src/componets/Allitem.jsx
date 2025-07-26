import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Make sure to install this package
import Header from "./iHeader";; 



function Allitems() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [modelState, setModelState] = useState(false);
    const [selectedID, setSelectedID] = useState("");
    const [updateCode, setUpdateCode] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateIgroup, setUpdateIgroup] = useState("");
    const [updateQuantity, setUpdateQuantity] = useState("");
    const [updateCost, setUpdateCost] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await axios.get("http://localhost:8070/inventory/getinventory");
                setItems(res.data);
            } catch (err) {
                alert(err.message);
            }
        };

        getItems();
    }, []);

    const loadModel = async (id) => {
        const updateItem = await axios.get(`http://localhost:8070/inventory/getinventory/${id}`);
        setModelState(true);
        setSelectedID(updateItem.data._id);
        setUpdateCode(updateItem.data.code);
        setUpdateIgroup(updateItem.data.igroup);
        setUpdateName(updateItem.data.name);
        setUpdateQuantity(updateItem.data.quantity);
        setUpdateCost(updateItem.data.cost);
    };

    const updateInventory = async () => {
        if (!updateCode || !updateName) {
            Swal.fire({ title: "Error", text: "Please fill in all required fields.", icon: "error" });
            return;
        }
        const newDate = document.getElementById("date").value;
        if (!newDate) {
            Swal.fire({ title: "Error", text: "Please enter the date.", icon: "error" });
            return;
        }

        try {
            await axios.put(`http://localhost:8070/inventory/updateinventory/${selectedID}`, {
                code: updateCode,
                name: updateName,
                igroup: updateIgroup,
                quantity: updateQuantity,
                cost: updateCost,
                addDate: newDate,
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Item Updated",
                showConfirmButton: false,
                timer: 1500
            });

            const updatedItems = items.map(item =>
                item._id === selectedID
                    ? { ...item, code: updateCode, name: updateName, igroup: updateIgroup, quantity: updateQuantity, cost: updateCost }
                    : item
            );
            setItems(updatedItems);
            setModelState(false);
        } catch (e) {
            console.log(e);
            Swal.fire({ title: "Error", text: "Failed to update the item.", icon: "error" });
        }
    };

    const deleteInventory = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8070/inventory/deleteinventory/${id}`);
                    const updatedItems = items.filter(item => item._id !== id);
                    setItems(updatedItems);
                    Swal.fire({ title: "Deleted!", text: "Your item has been deleted.", icon: "success" });
                } catch (e) {
                    console.log(e);
                }
            }
        });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Item List", 14, 22);
        doc.autoTable({
            head: [['Item Code', 'Name', 'Item Group', 'On Hand']],
            body: items.map(item => [item.code, item.name, item.igroup, item.quantity]),
        });
        doc.save("item_list.pdf");
    };

    const filteredItems = items.filter(item => {
        const code = item.code ? item.code.toLowerCase() : "";
        const name = item.name ? item.name.toLowerCase() : "";
        const igroup = item.igroup ? item.igroup.toLowerCase() : "";
        const query = searchQuery.toLowerCase();
        return code.includes(query) || name.includes(query) || igroup.includes(query);
    });

    return (
        <div>
            <Header />
        <div className="container">
            
            <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginTop: "20px" }}>
                <h1 className="mb-0">All Items</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn btn-success" onClick={() => navigate("/add")}>Add Item</button>
                    <button className="btn btn-info" onClick={downloadPDF}>Download PDF</button>
                </div>
            </div>



{/*Search*/}
            <div className="mb-3 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by code, name or group..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "300px",
                        borderRadius: "25px",
                        padding: "10px",
                        border: "1px solid #ced4da",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)"
                    }}
                />
            </div>

            <div style={{ marginTop: "20px" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Item Code</th>
                            <th style={{ textAlign: "center" }}>Name</th>
                            <th style={{ textAlign: "center" }}>Item Group</th>
                            <th style={{ textAlign: "center" }}>On Hand</th>
                            <th style={{ textAlign: "center" }}>Low Stock Alert</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr key={item._id}>
                                <td style={{ textAlign: "center" }}>{item.code}</td>
                                <td style={{ textAlign: "center" }}>{item.name}</td>
                                <td style={{ textAlign: "center" }}>{item.igroup}</td>
                                <td style={{ textAlign: "center" }} className={parseFloat(item.quantity) <= 10 ? 'text-danger' : ''}>
                                    {item.quantity}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    {parseFloat(item.quantity) <= 10 && (
                                        <button
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "red",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                animation: "blink 1s infinite"
                                            }}
                                        >
                                            Low Stock
                                        </button>
                                    )}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button type="button" className="btn btn-warning" onClick={() => loadModel(item._id)}>Update</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteInventory(item._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={modelState} onHide={() => setModelState(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Item Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                value={updateCode}
                                onChange={(e) => setUpdateCode(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Item Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={updateName}
                                onChange={(e) => setUpdateName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="igroup" className="form-label">Item Group</label>
                            <input
                                type="text"
                                className="form-control"
                                id="igroup"
                                value={updateIgroup}
                                onChange={(e) => setUpdateIgroup(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                value={updateQuantity}
                                onChange={(e) => setUpdateQuantity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cost" className="form-label">Cost</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cost"
                                value={updateCost}
                                onChange={(e) => setUpdateCost(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setModelState(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={updateInventory}>Update Item</button>
                </Modal.Footer>
            </Modal>
            
        </div>
        </div>
       
    );
}

export default Allitems;
