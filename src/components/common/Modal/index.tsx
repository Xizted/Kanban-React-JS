import { Box, Button, Modal as ModalMUI, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import db from '../../../firebase/firebase-config';
import BoardContext from '../../../context/BoardContext';
import { useContext } from 'react';

interface ModalProps {
  handleClose: () => void;
  open: boolean;
  selectedCard: { cardId: string; listId: string; cardDescription: string };
}

interface EditCardValues {
  description: string;
}

const editCardValuesSchema = Yup.object({
  description: Yup.string().required('Required'),
});

const Modal = ({ open, handleClose, selectedCard }: ModalProps) => {
  const { lists, setLists } = useContext(BoardContext);

  const { handleSubmit, control } = useForm<EditCardValues>({
    defaultValues: {
      description: selectedCard.cardDescription,
    },
    resolver: yupResolver(editCardValuesSchema),
    mode: 'all',
  });

  const onSubmit = ({ description }: EditCardValues) => {
    const newLists = lists.map((list) => {
      if (list.id === selectedCard.listId) {
        const newTasks = list.tasks.map((task) =>
          task.id === selectedCard.cardId ? { ...task, description } : task
        );
        return { ...list, tasks: newTasks };
      }
      return list;
    });

    setLists(newLists);

    db.collection(`board`)
      .doc('lists')
      .set({
        listsArr: newLists,
      })
      .then(() => handleClose());
  };

  return (
    <ModalMUI
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        bgcolor={'white'}
        width={500}
        borderRadius={2}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        gap={2}
        padding={10}
        position="absolute"
        top="50%"
        left="50%"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <Controller
          control={control}
          rules={{ required: true }}
          name="description"
          render={({ field: { name, onBlur, onChange, value } }) => (
            <TextField
              id="description"
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label="Editar Tarea"
              variant="standard"
              fullWidth
            />
          )}
        />
        <Box>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </ModalMUI>
  );
};

export default Modal;
