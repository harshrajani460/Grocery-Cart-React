import React from "react";

const List = ({ groceryList, setEditItem, handleDelete }) => {
  return (
    <>
      <div className="container2">
        <h1 className="item-heading">Grocery List</h1>
        <div className="add-container" id="list-item">
          {groceryList.map((item) => {
            return (
              <div className="item" key={item.name}>
                <div className="item-text">
                  <div className="item-text-1">{item.name}</div>
                  <div className="item-text-2">x {item.qt}</div>
                </div>
                <button className="item-edit" onClick={() => setEditItem(item)}>
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
    </>
  );
};

export default List;
