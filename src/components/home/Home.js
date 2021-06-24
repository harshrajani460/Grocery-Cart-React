import React, { useState, useEffect } from "react";
import Form from "../form/Form.js";
import List from "../list/List.js";
import "./home.css";

const Home = () => {
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
            <List
              groceryList={groceryList}
              handleDelete={(item) => handleDelete(item)}
              setEditItem={(item) => setEditItem(item)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
