import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { listsRef } from '../../../firebase/firebase-config';
import { useContext } from 'react';
import BoardContext from '../../../context/BoardContext';

interface DeleteCardProps {
  listId: string;
  cardId: string;
}

const DeleteCard = ({ listId, cardId }: DeleteCardProps) => {
  const { lists, setLists } = useContext(BoardContext);

  const deleteCard = () => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        const newTaks = list.tasks.filter((task) => task.id !== cardId);

        return { ...list, tasks: newTaks };
      } else {
        return list;
      }
    });

    setLists(newLists);
    listsRef.update({ listsArr: newLists });
  };

  return (
    <Tooltip title={'Eliminar Tarea'}>
      <IconButton onClick={() => deleteCard()} size={'small'}>
        <DeleteIcon color={'error'} />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteCard;
