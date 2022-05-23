import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { listsRef } from '../../../firebase/firebase-config';
import BoardContext from '../../../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';

interface AddCardPros {
  listId: string;
}

interface AddCardValues {
  description: string;
}

const addCardValuesSchema = Yup.object({
  description: Yup.string().required('Required'),
});

const AddCard = ({ listId }: AddCardPros) => {
  const [isShow, setShow] = useState(false);
  const { lists, setLists } = useContext(BoardContext);

  const { handleSubmit, control, reset } = useForm<AddCardValues>({
    defaultValues: {
      description: '',
    },
    resolver: yupResolver(addCardValuesSchema),
    mode: 'all',
  });

  const onSubmit = ({ description }: AddCardValues) => {
    const newTask = {
      id: uuidv4(),
      description,
      completed: false,
      listId,
      created: new Date(),
      updated: new Date(),
    };

    const newLists = lists.map((list) =>
      list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
    );

    setLists(newLists);

    listsRef
      .set({ listsArr: newLists })
      .then(() => {
        reset({ description: '' });
        setShow(false);
      })
      .catch(() => console.log('Ha Ocurrido un error al crear la Tarea'));
  };
  return (
    <Box display={'flex'} gap={1}>
      {!isShow && (
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          onClick={() => setShow(true)}
          style={{ opacity: 0.8, cursor: 'pointer' }}
        >
          <AddIcon />
          <Typography>Añadir Tarea</Typography>
        </Box>
      )}
      {isShow && (
        <Box
          component={'form'}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          alignItems={'start'}
          onSubmit={handleSubmit(onSubmit)}
          width={'100%'}
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
                label="Descripcion de la Tarea"
                variant="standard"
                fullWidth
              />
            )}
          />
          <Box>
            <Button type="submit" variant="contained">
              Añadir Tarea
            </Button>
            <Tooltip title="Cerrar">
              <IconButton
                onClick={() => {
                  reset({ description: '' });
                  setShow(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddCard;
