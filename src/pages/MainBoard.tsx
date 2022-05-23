import { Box } from '@mui/system';
import { useState } from 'react';
import Modal from '../components/common/Modal';
import Board from '../components/mainboard/Board';
import Header from '../components/mainboard/Header';

const MainBoard = () => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    cardId: '',
    listId: '',
    cardDescription: '',
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <Box padding={2} height={'80vh'}>
        <Board setSelectedCard={setSelectedCard} handleOpen={handleOpen} />
      </Box>
      {open && (
        <Modal
          open={open}
          handleClose={handleClose}
          selectedCard={selectedCard}
        />
      )}
    </>
  );
};

export default MainBoard;
