import { BackgroundImage, Box, Text, Flex, Button, Grid,ThemeIcon, Paper } from '@mantine/core';
import { IconBackpack, IconDirections, IconBrain  } from '@tabler/icons-react';

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
          <Flex   justify="center" align="center" >

            <Text size={20} weight='bold'>
              <h2> Travel with peace of mind </h2>
            </Text>

          </Flex>

          <Box mt={50}>
              <Flex justify="center" align="center">
                <Grid  gutter={300}>
                    <Grid.Col  span={4} width={550}> 
                    <Paper shadow="xl" radius="md" p="xl" >
                      <ThemeIcon variant="light" radius="xl" size="xl" color="cyan">
                        <IconBrain  />
                      </ThemeIcon>
                      <h3>Simplified brainstorming </h3>
                  </Paper> 
                  </Grid.Col>  

                  <Grid.Col  span={4}> 
                  <Paper shadow="xl" radius="md" p="xl">
                      <ThemeIcon variant="light" radius="xl" size="xl" color="cyan">
                        <IconBackpack  />
                      </ThemeIcon>
                      <h3>Friendly exploration   </h3>
                  </Paper> 
                  </Grid.Col> 

                  <Grid.Col  span={4}> 
                  <Paper shadow="xl" radius="md" p="xl">
                      <ThemeIcon variant="light" radius="xl" size="xl" color="cyan">
                        <IconDirections  />
                      </ThemeIcon>
                      <h3>Centralized decision making </h3>
                  </Paper> 
                  </Grid.Col> 

                </Grid>
              </Flex>
          </Box>
          
        </Box>

        <Box mt={50} >
          <Paper shadow="xl" radius="md" p="xl">
            <Text> Hello </Text>
          </Paper>
        </Box>







        </>
      );
}


export default HomePage
