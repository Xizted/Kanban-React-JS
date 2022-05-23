import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { listsRef } from '../../../firebase/firebase-config';
import { useContext } from 'react';
import BoardContext from '../../../context/BoardContext';

interface DeleteListProps {
  listId: string;
}

const DeleteList = ({ listId }: DeleteListProps) => {
  const { lists, setLists } = useContext(BoardContext);

  const deleteList = () => {
    const newList = lists.filter((list) => list.id !== listId);
    setLists(newList);
    listsRef.update({ listsArr: newList });
  };

  return (
    <Tooltip title={'Eliminar Lista'}>
      <IconButton onClick={() => deleteList()}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteList;
