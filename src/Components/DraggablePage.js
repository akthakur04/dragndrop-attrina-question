import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialList1 = ["Item 1", "Item 2", "Item 3"];
const initialList2 = ["Item 4", "Item 5", "Item 6"];

function DragAndDrop() {
  const [list1, setList1] = useState(initialList1);
  const [list2, setList2] = useState(initialList2);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = source.droppableId === "droppable1" ? list1 : list2;
    const destinationList =
      destination.droppableId === "droppable1" ? list1 : list2;
    const setSourceList =
      source.droppableId === "droppable1" ? setList1 : setList2;
    const setDestinationList =
      destination.droppableId === "droppable1" ? setList1 : setList2;
    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);
    setSourceList([...sourceList]);
    setDestinationList([...destinationList]);
  };

  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          paddingLeft: "15px",
          paddingBottom: "10px",
          borderBottom: "1px solid black",
        }}
      >
        Drag And Drop{" "}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          <Droppable droppableId="droppable1">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  margin: 8,
                  padding: 8,
                  width: 200,
                  backgroundColor: "#f0f0f0",
                }}
              >
                {list1.map((item, index) => (
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="droppable2">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  margin: 8,
                  padding: 8,
                  width: 200,
                  backgroundColor: "#f0f0f0",
                }}
              >
                {list2.map((item, index) => (
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
              </div>
            )}
          </Droppable>
        </div>
        <div>Elements of Array one are - {list1.map((e, i) => `${e} , `)}</div>
        <div>Elements of Array one are - {list2.map((e, i) => `${e} , `)}</div>
      </DragDropContext>
    </>
  );
}

export default DragAndDrop;
