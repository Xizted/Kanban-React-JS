import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';

interface EditCardProps {
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{
      cardId: string;
      listId: string;
      cardDescription: string;
    }>
  >;
  description: string;
  id: string;
  listId: string;
  handleOpen: () => void;
}

const EditCard = ({
  setSelectedCard,
  description,
  id,
  listId,
  handleOpen,
}: EditCardProps) => {
  return (
    <Tooltip title={'Editar Tarea'}>
      <IconButton
        onClick={() => {
          setSelectedCard({
            cardId: id,
            listId,
            cardDescription: description,
          });
          handleOpen();
        }}
        size={'small'}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditCard;
