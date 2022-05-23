import { Box, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { listsRef } from '../../../firebase/firebase-config';
import DeleteCard from './DeleteCard';
import EditCard from './EditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useContext } from 'react';
import BoardContext from '../../../context/BoardContext';

interface CardProps {
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{
      cardId: string;
      listId: string;
      cardDescription: string;
    }>
  >;
  id: string;
  description: string;
  completed: boolean;
  listId: string;
  handleOpen: () => void;
  index: number;
}

const Card = ({
  id,
  description,
  completed,
  setSelectedCard,
  handleOpen,
  listId,
  index,
}: CardProps) => {
  const { lists, setLists } = useContext(BoardContext);

  const changeStatusCompleted = () => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        const newTaks = list.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );

        return { ...list, tasks: newTaks };
      } else {
        return list;
      }
    });

    setLists(newLists);
    listsRef.update({ listsArr: newLists });
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <Box
          bgcolor={'white'}
          padding={1}
          borderRadius={1}
          boxShadow={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Box
            onClick={() => changeStatusCompleted()}
            flex={1}
            style={{ cursor: 'pointer', transition: 'all 0.5s ease' }}
            display={'flex'}
            gap={2}
            alignItems={'center'}
          >
            {completed ? (
              <CheckCircleIcon color={'success'} />
            ) : (
              <PendingIcon color={'disabled'} />
            )}
            <Typography
              style={{
                textDecoration: completed ? 'line-through' : 'none',
                wordBreak: 'break-all',
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box>
            <EditCard
              description={description}
              id={id}
              listId={listId}
              handleOpen={handleOpen}
              setSelectedCard={setSelectedCard}
            />
            <DeleteCard cardId={id} listId={listId} />
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
