'use client';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColumns,
  selectColumnOrder,
  moveTask,
  reorderTaskInColumn,
} from '@/lib/redux/tasks-slice';
import { KanbanColumn } from './kanban-column';
import { Status } from '@/lib/types';

export function KanbanBoard() {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const columnOrder = useSelector(selectColumnOrder);

  const onDragEnd = (result: DropResult) => {
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

    const startColumn = columns[source.droppableId as Status];
    const finishColumn = columns[destination.droppableId as Status];
    
    if (startColumn === finishColumn) {
      dispatch(reorderTaskInColumn({
        columnId: startColumn.id,
        sourceIndex: source.index,
        destIndex: destination.index,
        taskId: draggableId,
      }));
      return;
    }

    dispatch(moveTask({
      sourceColumnId: startColumn.id,
      destColumnId: finishColumn.id,
      sourceIndex: source.index,
      destIndex: destination.index,
      taskId: draggableId,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          return <KanbanColumn key={column.id} column={column} />;
        })}
      </div>
    </DragDropContext>
  );
}
