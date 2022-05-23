import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import DeleteList from './DeleteList';
import EditList from './EditList';

interface HeaderListProps {
  listName: string;
  listId: string;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const HeaderList = ({ listName, listId, dragHandleProps }: HeaderListProps) => {
  const [isShow, setShow] = useState(false);

  return (
    <Box {...dragHandleProps}>
      {!isShow && (
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography
            fontWeight={600}
            onClick={() => setShow(true)}
            style={{ cursor: 'text' }}
          >
            {listName}
          </Typography>
          <DeleteList listId={listId} />
        </Box>
      )}
      {isShow && (
        <EditList listId={listId} setShow={setShow} listName={listName} />
      )}
    </Box>
  );
};

export default HeaderList;
