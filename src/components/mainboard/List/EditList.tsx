import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { listsRef } from '../../../firebase/firebase-config';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import BoardContext from '../../../context/BoardContext';
import { useContext } from 'react';

interface EditListValues {
  title: string;
}

interface EditListProps {
  listId: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  listName: string;
}

const editListValuesSchema = Yup.object({
  title: Yup.string().required('Required'),
});

const EditList = ({ listId, setShow, listName }: EditListProps) => {
  const { lists, setLists } = useContext(BoardContext);
  const { handleSubmit, control, reset } = useForm<EditListValues>({
    defaultValues: {
      title: listName,
    },
    resolver: yupResolver(editListValuesSchema),
    mode: 'all',
  });

  const onSubmit = ({ title }: EditListValues) => {
    const newLists = lists.map((list) =>
      list.id === listId ? { ...list, listName: title } : list
    );

    setLists(newLists);

    listsRef.set({ listsArr: newLists }).then(() => {
      setShow(false);
      reset();
    });
  };

  return (
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
        render={({ field: { name, onChange, value } }) => (
          <TextField
            id="title"
            label="Editar Titulo"
            name={name}
            maxRows={4}
            value={value}
            onChange={onChange}
            onBlur={() => {
              reset({ title: '' });
              setShow(false);
            }}
            autoFocus
            fullWidth
            size={'small'}
            style={{ backgroundColor: '#fff' }}
          />
        )}
      />
    </Box>
  );
};

export default EditList;
