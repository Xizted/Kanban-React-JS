import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AddList from '../List/AddList';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Lists from '../List/Lists';
import BoardContext from '../../../context/BoardContext';
import { useContext } from 'react';
import { listsRef } from '../../../firebase/firebase-config';

interface BoardProps {
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{
      cardId: string;
      listId: string;
      cardDescription: string;
    }>
  >;
  handleOpen: () => void;
}

const Board = ({ setSelectedCard, handleOpen }: BoardProps) => {
  const { lists, setLists } = useContext(BoardContext);

  const handleOnDrag = ({ destination, source, type }: DropResult) => {
    if (!destination) return;

    if (destination.index === source.index && type === 'list') return;

    if (type === 'list') {
      const newLists = [...lists];
      const [listMoved] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, listMoved);
      setLists(newLists);
      listsRef.set({ listsArr: newLists });
    }

    if (type === 'card') {
      const newLists = [...lists];

      const [listSource] = newLists.filter(
        (list) => list.id === source.droppableId
      );
      const [listDestination] = newLists.filter(
        (list) => list.id === destination.droppableId
      );

      const [taskMoved] = listSource.tasks.splice(source.index, 1);
      listDestination.tasks.splice(destination.index, 0, taskMoved);

      setLists(newLists);

      listsRef.set({ listsArr: newLists });
    }
  };
  return (
    <Paper
      elevation={5}
      style={{
        padding: '1rem',
        height: '100%',
        borderRadius: 10,
      }}
    >
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant={'h4'}>Tablero</Typography>
        <hr />
      </Box>
      <DragDropContext onDragEnd={handleOnDrag}>
        <Droppable droppableId="lists" direction="horizontal" type="list">
          {(provided) => (
            <Box
              paddingTop={2}
              height={'80%'}
              display={'flex'}
              gap={3}
              alignItems={'start'}
              width={'100%'}
              style={{ overflowX: 'auto' }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Lists
                handleOpen={handleOpen}
                setSelectedCard={setSelectedCard}
              />
              {provided.placeholder}
              <AddList />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};

export default Board;
