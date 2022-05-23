import { useContext, useEffect } from 'react';

import db from '../../../firebase/firebase-config';
import List from '.';
import BoardContext from '../../../context/BoardContext';

interface ListsProps {
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{
      cardId: string;
      listId: string;
      cardDescription: string;
    }>
  >;
  handleOpen: () => void;
}

const Lists = ({ setSelectedCard, handleOpen }: ListsProps) => {
  const { lists, setLists } = useContext(BoardContext);

  useEffect(() => {
    db.collection('board').onSnapshot((snap) => {
      const { listsArr } = snap.docs[0].data();
      let lists;

      if (listsArr.lenght === 0) {
        lists = 0;
      } else {
        lists = listsArr.map((doc: any) => ({
          id: doc.id,
          listName: doc.listName,
          tasks: doc.tasks,
        }));
      }

      setLists(lists);
    });
  }, [setLists]);

  return (
    <>
      {lists.map((list, index) => (
        <List
          {...list}
          key={list.id}
          index={index}
          setSelectedCard={setSelectedCard}
          handleOpen={handleOpen}
        />
      ))}
    </>
  );
};

export default Lists;
