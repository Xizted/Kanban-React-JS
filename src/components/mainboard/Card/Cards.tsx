import Card from '.';

type Task = {
  id: string;
  description: string;
  completed: boolean;
  listId: string;
  created: Date;
  updated: Date;
};

interface CardsProps {
  listId: string;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{
      cardId: string;
      listId: string;
      cardDescription: string;
    }>
  >;
  handleOpen: () => void;
  tasks: Task[];
}

const Cards = ({ listId, setSelectedCard, handleOpen, tasks }: CardsProps) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Card
          {...task}
          setSelectedCard={setSelectedCard}
          handleOpen={handleOpen}
          listId={listId}
          key={task.id}
          index={index}
        />
      ))}
    </>
  );
};

export default Cards;
