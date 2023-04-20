import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';
import { Box, Flex, Paper, Button, BackgroundImage } from '@mantine/core'

function NotFound404() {
  const { token } = useContext(SessionContext);
  return (
    <Box>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1542736403-0c7afb53d053?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      >
        <Flex justify="center" align="center">
          <Box mt={230} mb={60}>
            <Paper shadow="xl" radius="md" p={100} pt={80}>
              <h1>404 Not Found: Seems that you are lost</h1>
              <p>Explore and discover the world with us.</p>
              <Button component={Link} to={'/'} color="cyan" >
                Find your way back home
              </Button>
            </Paper>
            <Box
              sx={{
                margin: '0 auto',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 'calc(20vh - 1px)',
              }}
            />
          </Box>
        </Flex>
      </BackgroundImage>
    </Box>
  );
}

export default NotFound404;