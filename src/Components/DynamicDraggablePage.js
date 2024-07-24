import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialLists = [
  { id: "list1", items: ["Item 1", "Item 2", "Item 3"] },
  { id: "list2", items: ["Item 4", "Item 5", "Item 6","Item 7"] },
];

function DynamicDragAndDrop() {
  const [lists, setLists] = useState(initialLists);
  const [newListName, setNewListName] = useState("");
  const [inputValues, setInputValues] = useState({});

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceListIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const destinationListIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );
    const sourceList = lists[sourceListIndex];
    const destinationList = lists[destinationListIndex];

    const [removed] = sourceList.items.splice(source.index, 1);
    destinationList.items.splice(destination.index, 0, removed);

    const newLists = [...lists];
    newLists[sourceListIndex] = sourceList;
    newLists[destinationListIndex] = destinationList;
    setLists(newLists);
  };

  const handleAddItem = (droppableId) => {
    const newItem = inputValues[droppableId];
    if (!newItem) return;

    const listIndex = lists.findIndex((list) => list.id === droppableId);
    const list = lists[listIndex];
    list.items.push(newItem);

    const newLists = [...lists];
    newLists[listIndex] = list;
    setLists(newLists);

    setInputValues({ ...inputValues, [droppableId]: "" });
  };

  const handleInputChange = (e, droppableId) => {
    setInputValues({ ...inputValues, [droppableId]: e.target.value });
  };

  const handleAddList = () => {
    if (!newListName) return;
    const newList = { id: `list${lists.length + 1}`, items: [] };
    setLists([...lists, newList]);
    setNewListName("");
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
          paddingLeft: "15px",
          paddingBottom: "10px",
          borderBottom: "1px solid black",
        }}
      >
        Drag And Drop Dynamic{" "}
      </div>

      <div
        style={{
          float:"right",
          marginBottom: "10px",
          paddingLeft: "15px",
          paddingBottom: "10px",
        }}
      >
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New list name"
        />
        <button onClick={handleAddList}>Add New List</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {lists.map((list) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    margin: 8,
                    padding: 8,
                    width: 200,
                    backgroundColor: "#f0f0f0",
                    // ...provided.draggableProps.style

                  }}
                >
                  {list.items.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                          }}
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <input
                    type="text"
                    value={inputValues[list.id] || ""}
                    onChange={(e) => handleInputChange(e, list.id)}
                  />
                  <button onClick={() => handleAddItem(list.id)}>
                    Add Item
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default DynamicDragAndDrop;
