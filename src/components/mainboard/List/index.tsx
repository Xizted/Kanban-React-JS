import { Box } from '@mui/system';
import AddCard from '../Card/AddCard';
import HeaderList from './HeaderList';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Cards from '../Card/Cards';

type Task = {
  id: string;
  description: string;
  completed: boolean;
  listId: string;
  created: Date;
  updated: Date;
};

interface ListProps {
  id: string;
  listName: string;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{
      cardId: string;
      listId: string;
      cardDescription: string;
    }>
  >;
  handleOpen: () => void;
  index: number;
  tasks: Task[];
}

const List = ({
  id,
  listName,
  index,
  setSelectedCard,
  handleOpen,
  tasks,
}: ListProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box
          width={250}
          padding={2}
          height={'auto'}
          maxHeight={'80%'}
          borderRadius={2}
          overflow={'auto'}
          bgcolor={'lightgrey'}
          style={{ opacity: 0.8, overflowY: 'auto' }}
          flex={'0 0 auto'}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <HeaderList
            listName={listName}
            listId={id}
            dragHandleProps={provided.dragHandleProps}
          />
          <Droppable droppableId={id} direction="vertical" type="card">
            {(provided) => (
              <Box
                paddingTop={1}
                display={'flex'}
                flexDirection={'column'}
                gap={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Cards
                  listId={id}
                  handleOpen={handleOpen}
                  setSelectedCard={setSelectedCard}
                  tasks={tasks}
                />

                {provided.placeholder}
                <AddCard listId={id} />
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
};

export default List;
