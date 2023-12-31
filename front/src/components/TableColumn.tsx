import TaskItem from './TaskItem'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MyTask } from '../types/project-types'
import { Draggable, Droppable } from 'react-beautiful-dnd';

type TableColumnProps = {
  id: string,
  title: string,
  tasks: MyTask[]
}

function TableColumn({ id, title, tasks }: TableColumnProps) {

  return (
    <Droppable droppableId={id} key={id}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps} 
            className='bg-projectBg h-auto min-h-[240px] min-w-full col-span-1 text-white px-1 lg:px-3 py-2 lg:py-4 w-fit rounded-sm'
          > 
            <h4 className='flex justify-between items-center truncate gap-2 mb-1 lg:mb-3'>
              <span>{title}</span>
              <MoreVertIcon className='!cursor-pointer'/>
            </h4>
            <div className='w-full flex flex-col gap-2 items-center'>
              {tasks && tasks.map((task: MyTask, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => {
                      const data = {
                        name: task.data.name,
                        estimation: task.data.estimation,
                        specialization: task.data.specialization, 
                        assignedTo: task.data.assignedTo,
                        createdBy: task.createdBy,
                        dateCreated: task.dateCreated,
                      }
                      return (
                        <TaskItem
                          key={task.id}
                          taskId={task.id} 
                          reference={provided.innerRef}
                          dragProps={provided.draggableProps}
                          dragHandle={provided.dragHandleProps}
                          data={data}
                        />
                      );
                    }}
                  </Draggable>
                )}
              )}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  )
}

export default TableColumn