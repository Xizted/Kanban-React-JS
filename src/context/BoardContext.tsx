import { createContext } from 'react';

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

interface ContextProps {
  lists: ListI[];
  setLists: React.Dispatch<React.SetStateAction<ListI[]>>;
}

const BoardContext = createContext<ContextProps>({} as ContextProps);

export default BoardContext;
