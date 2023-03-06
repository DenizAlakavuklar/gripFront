import { BackgroundImage, Box, Text, Flex, Button } from '@mantine/core';

const HomePage = () => {

      return (
        <>
        <Box>
          <BackgroundImage  src="https://images.unsplash.com/photo-1606933988322-a3cb8968e5ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" >
          <Flex   justify="flex-start" align="center"  >
          <Text mt={-250} ml={150} align='center' size={50} weight='bold' color="white">
            <h2> Make traveling with friends, easy</h2>
          </Text>
          <Text  mt={-90} ml={-1100}  size={20} weight='bold' color="white">
            <h2> Welcome to your next adventure, welcome to Grip</h2>
          </Text>
          <Button color="cyan" mt={50} ml={-700} >
            Learn more
          </Button>
              
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'calc(80vh - 10px)',
            }}
          />
          </Flex>
          </BackgroundImage>
        </Box>

        <Box>
          <Flex   justify="flex-start" align="center" justify="center" >
            <Text size={20} weight='bold'>
              <h2> Travel with peace of mind </h2>
            </Text>
          </Flex>
          
        </Box>




        </>
      );
}


export default HomePage
