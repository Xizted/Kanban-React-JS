import { AppBar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import BallotIcon from '@mui/icons-material/Ballot';

const Header = () => {
  return (
    <AppBar position="static">
      <Box
        display={'flex'}
        padding={2}
        gap={1}
        alignItems={'center'}
        sx={{ justifyContent: { xs: 'center', md: 'start' } }}
      >
        <BallotIcon fontSize="large" />
        <Typography variant="h4" fontWeight={500}>
          TodoApp
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
