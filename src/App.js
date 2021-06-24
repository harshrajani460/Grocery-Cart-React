import "./App.css";
import Form from "./components/form/Form.js";
import React, { useState, useEffect } from "react";
function App() {
  const [groceryList, setGroceryList] = useState(getGroceryList());
  const [count, setCount] = useState(0);
  const [editItem, setEditItem] = useState({ name: "", qt: "" });
  useEffect(() => {
    console.log("Use Effect");
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [count]);

  function getGroceryList() {
    let list = localStorage.getItem("groceryList");
    let arr = [];
    if (list !== null) arr = JSON.parse(list);
    return arr;
  }

  function handleDelete(item) {
    let list = groceryList;
    let newList = list.filter((listitem) => {
      if (listitem.name === item.name) {
        return false;
      }
      return true;
    });
    setGroceryList(newList);
    setCount((prevCount) => prevCount + 1);
  }
  function editListItem(element) {
    let list = groceryList;
    list = list.map((item) => {
      if (item.name === element.name) {
        return { ...item, qt: element.qt };
      } else {
        return item;
      }
    });
    setGroceryList(list);
  }
  function isAlready(element) {
    let isInList = false;
    groceryList.forEach((item) => {
      if (item.name === element.name) {
        isInList = true;
      }
    });
    return isInList;
  }
  function increamentQuantity(element) {
    let list = groceryList;
    console.log(element);
    list = list.map((item) => {
      if (item.name === element.name) {
        let newQt = element.qt + item.qt;
        return { ...item, qt: newQt };
      }
      return item;
    });
    setGroceryList(list);
  }
  function addListItem(element) {
    let list = groceryList;
    list.push(element);
    setGroceryList(list);
  }
  function handleSubmit(name, quantity, inEditMode) {
    const element = {
      name: name,
      qt: quantity,
    };
    if (inEditMode) {
      editListItem(element);
    } else if (isAlready(element)) {
      increamentQuantity(element);
    } else {
      addListItem(element);
    }

    setCount((prevCount) => prevCount + 1);
  }
  return (
    <>
      <div id="app">
        <div className="add-flow">
          <div className="container">
            <Form
              handleSubmit={(name, quantity, inEditMode) =>
                handleSubmit(name, quantity, inEditMode)
              }
              handleEdit={editItem}
            />
            <div className="container2">
              <h1 className="item-heading">Grocery List</h1>
              <div className="add-container" id="list-item">
                {groceryList.map((item) => {
                  return (
                    <div className="item">
                      <div className="item-text">
                        <div className="item-text-1">{item.name}</div>
                        <div className="item-text-2">x {item.qt}</div>
                      </div>
                      <button
                        className="item-edit"
                        onClick={() => setEditItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="item-delete"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
                {groceryList.length === 0 ? (
                  <p id="nothing">Nothing to Show!!</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
