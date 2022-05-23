import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { firestore, listsRef } from '../../../firebase/firebase-config';
import { v4 as uuidv4 } from 'uuid';

interface AddListValues {
  title: string;
}

const addListValuesSchema = Yup.object({
  title: Yup.string().required('Required'),
});

const AddList = () => {
  const [isShow, setShow] = useState(false);

  const { handleSubmit, control, reset } = useForm<AddListValues>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(addListValuesSchema),
    mode: 'all',
  });

  const onSubmit = ({ title }: AddListValues) => {
    listsRef
      .update({
        listsArr: firestore.FieldValue.arrayUnion({
          id: uuidv4(),
          listName: title,
          tasks: [],
          created: new Date(),
          updated: new Date(),
        }),
      })
      .then(() => {
        reset({ title: '' });
        setShow(false);
      })
      .catch((e) => console.log('Ha Ocurrido un error al crear la Lista', e));
  };

  return (
    <Box
      width={250}
      padding={2}
      borderRadius={2}
      bgcolor={'lightgrey'}
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      flex={'0 0 auto'}
      overflow={'auto'}
    >
      {!isShow && (
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          onClick={() => setShow(true)}
          style={{ opacity: 0.8, cursor: 'pointer' }}
        >
          <AddIcon />
          <Typography>Añadir Lista</Typography>
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
        >
          <Controller
            control={control}
            rules={{ required: true }}
            name="title"
            render={({ field: { name, onBlur, onChange, value } }) => (
              <TextField
                id="title"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                label="Introduzca Titulo de la Lista"
                variant="standard"
                fullWidth
              />
            )}
          />
          <Box>
            <Button type="submit" variant="contained">
              Añadir Lista
            </Button>
            <Tooltip title="Cerrar">
              <IconButton
                onClick={() => {
                  reset({ title: '' });
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

export default AddList;
