import React, { useState, useEffect } from "react";

const Form = ({ handleSubmit, handleEdit }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inEditMode, setInEditMode] = useState(false);

  useEffect(() => {
    if (inEditMode) {
      document.getElementById("inp-item").readOnly = true;
    } else {
      document.getElementById("inp-item").readOnly = false;
    }
  }, [inEditMode]);
  useEffect(() => {
    let newName = name.trim();
    let newQuantity = Number(quantity);
    if (newName.length > 0 && newQuantity > 0) {
      document.getElementById("add-btn").disabled = false;
    } else {
      document.getElementById("add-btn").disabled = true;
    }
  }, [name, quantity]);

  useEffect(() => {
    if (handleEdit.name !== "") {
      setInEditMode(true);
      setName(handleEdit.name);
      setQuantity(handleEdit.qt);
    }
  }, [handleEdit]);

  function handleName(event) {
    setName(event.target.value);
  }
  function handleQuantity(event) {
    if (Number(event.target.value) > 0) setQuantity(event.target.value);
    else setQuantity("");
  }
  function handleSubmitForm() {
    let newName = name.trim();
    let newQuantity = Number(quantity);
    handleSubmit(newName, newQuantity, inEditMode);
    setName("");
    setQuantity("");
    setInEditMode(false);
  }
  return (
    <>
      <div className="container1">
        <h1 className="item-heading" id="action-heading">
          {inEditMode ? "Edit Grocery Item" : "Add Grocery Item"}
        </h1>
        <div className="add-container">
          <p className="inp-title">Item Name</p>
          <input
            type="text"
            placeholder="Add Item Name"
            className="inp-item"
            id="inp-item"
            value={name}
            onChange={handleName}
          />
          <p className="inp-title">Quantity</p>
          <input
            type="number"
            placeholder="Add Item Quantity"
            className="inp-qt"
            id="inp-qt"
            value={quantity}
            min="1"
            required
            onChange={handleQuantity}
          />
          <button id="add-btn" onClick={handleSubmitForm}>
            {inEditMode ? "Edit Item" : "Add Item"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
