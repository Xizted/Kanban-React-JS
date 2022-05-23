import { ThemeProvider } from '@mui/material';
import { theme } from './components/theme';
import BoardProvider from './context/BoardProvider';
import MainBoard from './pages/MainBoard';

const TodoApp = () => {
  return (
    <BoardProvider>
      <ThemeProvider theme={theme}>
        <MainBoard />
      </ThemeProvider>
    </BoardProvider>
  );
};

export default TodoApp;
