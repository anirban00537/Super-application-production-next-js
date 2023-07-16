"use client"
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface Data {
  tasks: { [taskId: string]: Task };
  columns: { [columnId: string]: Column };
  columnOrder: string[];
}

const initialData: Data = {
  tasks: {
    task1: { id: "task1", content: "Task 1" },
    task2: { id: "task2", content: "Task 2" },
    task3: { id: "task3", content: "Task 3" },
    task4: { id: "task4", content: "Task 4" },
  },
  columns: {
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: ["task1", "task2", "task3", "task4"],
    },
    column2: {
      id: "column2",
      title: "In Progress",
      taskIds: [],
    },
    column3: {
      id: "column3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column1", "column2", "column3"],
};

const Board: React.FC = () => {
  const [data, setData] = useState<Data>(initialData);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    newSourceTaskIds.splice(source.index, 1);

    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
    newDestinationTaskIds.splice(destination.index, 0, draggableId);

    const newColumns = {
      ...data.columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      },
      [destinationColumn.id]: {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      },
    };

    const newData: Data = {
      ...data,
      columns: newColumns,
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <div
              key={column.id}
              className="flex flex-col bg-gray-100 rounded w-80"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{column.title}</h3>
                <Droppable droppableId={column.id}>
                  {(provided:any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-40 bg-white rounded p-2 shadow-sm"
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided:any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white rounded p-2 mb-2 shadow-sm"
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="bg-gray-200 p-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Add Task
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
