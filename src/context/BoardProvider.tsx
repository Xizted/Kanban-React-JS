import { useState } from 'react';
import BoardContext from './BoardContext';

type Task = {
  id: string;
  description: string;
  completed: boolean;
  listId: string;
  created: Date;
  updated: Date;
};

interface ListI {
  id: string;
  listName: string;
  tasks: Task[];
}

interface BoardProviderProps {
  children: JSX.Element | JSX.Element[];
}

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [lists, setLists] = useState<ListI[]>([]);

  return (
    <BoardContext.Provider value={{ lists, setLists }}>
      {children}
    </BoardContext.Provider>
  );
};
export default BoardProvider;
