import { Container, BackgroundImage, Box, Text, Flex, Button, Grid,ThemeIcon, Paper, Image, Divider, Blockquote, Card, Badge, Group } from '@mantine/core';
import { IconBackpack, IconDirections, IconBrain  } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';

const HomePage = () => {
  const [newestUsers, setNewestUsers] = useState("")
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/auth/newestusers`)
      const parsed = await response.json()
      //console.log("newestUsers", newestUsers)
      setNewestUsers(parsed)
      //console.log("Parsed users is :", parsed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUsers()
             
  }, [])

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
          <Button component={Link} to='/about' color="cyan" mt={80} ml={-700}  radius="md" size="lg">
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

        <Box mt={40}>
          <Flex justify="center" align="center" >

            <Text size={20} weight='bold'>
              <h2> Travel with peace of mind </h2>
            </Text>

          </Flex>

          <Box mt={50}>
              <Flex justify="center" align="center">
                <Grid  gutter={250}>
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


        <Flex justify="center" align="center" mt={80}>
          <Box>
            <Button component={Link} to='/signup' variant='subtle' color='cyan' radius="md" size="lg">
              Plan your next trip
            </Button>
          </Box>
        </Flex>



        <Box mt={60}>
        <Divider size="xs" />
        </Box>

        <Box mt={40}>
          <Flex justify="center" align="center" direction="column">
            <Box>

            
            <Text size={20} weight='bold'>
              
            <h2> Newest members </h2></Text>
</Box>
<Box>
<Container size="md" px="xs">
{newestUsers ? newestUsers.map(user =>{ 
return <img src={user.picture} width="60" alt={user.username}/> }) : <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#d6f5f9', '#13daf4', '#a7f0f9', '#40d2e5', '#15aabf']}
/>}
</Container>
</Box>
            

          </Flex>
          </Box>
          <Box mt={60}>
        <Divider size="xs" />
        </Box>


        <Box>
          <Flex justify="center" align="center" direction="row" mt={80}>
            <Box >
              <Paper shadow="xl" radius="md" p="xl"  maw={350}>
                  <Blockquote cite="– Grip">
                  The world is vast, a tapestry,
                  A wonderland of sights to see,
                  From snowy peaks to sandy shores,
                  It calls us out, it longs for more.
                </Blockquote>
              </Paper>
            </Box>
            <Box ml={260}>
              <Image maw={480} mx="auto" radius="md" src="https://images.unsplash.com/photo-1611089804502-245fcc83ae81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60" alt="Random image" />
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex justify="center" align="center" direction="row" mt={80}>
            <Box mr={260}>
              <Image maw={480} mx="auto" radius="md" src="https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fHR1cnF1b2lzZSUyMG1vdW50YWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" alt="Random image" />
            </Box>
            <Box >
              <Paper shadow="xl" radius="md" p="xl"  maw={350}>
                  <Blockquote cite="– Grip">
                  The winding roads and twisting turns,
                  The mountain paths where freedom burns,
                  The open skies where dreams take flight,
                  And cities bathed in neon light.
                </Blockquote>
              </Paper>
            </Box>
          </Flex>
        </Box>


        <Box>
          <Flex justify="center" align="center" direction="row" mt={80}>
            <Box >
              <Paper shadow="xl" radius="md" p="xl"  maw={350}>
                  <Blockquote cite="– Grip ">
                  With every step, a new surprise,
                  A chance to see with different eyes,
                  To taste, to touch, to feel, to know,
                  And watch the world in wonder grow.
                </Blockquote>
              </Paper>
            </Box>
            <Box ml={260}>
              <Image maw={480} mx="auto" radius="md" src="https://images.unsplash.com/photo-1515060939377-d73d9c162a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2304&q=80" alt="Random image" />
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex justify="center" align="center" direction="row" mt={80}>
            <Box mr={260}>
              <Image maw={480} mx="auto" radius="md" src="https://images.unsplash.com/photo-1457583221838-6bf5ad5ea874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2304&q=80" alt="Random image" />
            </Box>
            <Box >
              <Paper shadow="xl" radius="md" p="xl"  maw={350}>
                  <Blockquote cite="– Grip">
                  So let us travel far and wide,
                  With open hearts and eyes so wide,
                  And let the world embrace our soul,
                  And lead us on to paths unknown.
                </Blockquote>
              </Paper>
            </Box>
          </Flex>
        </Box>



<Box>
  <Flex justify="center" align="center" direction="row" mt={80}>
    <Text size={20} weight='bold'>
              <h2> Get inspired by the community </h2>
    </Text>
  </Flex>

</Box>

<Flex justify="center" align="center" direction="row" mt={50} mb={50}>
    <Box maw={430} mah={600} ml={50} mr={50}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={200}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Norway Fjord Adventures in April</Text>
          <Badge color="pink" variant="light">
            New
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>

        <Button component={Link} to='/signup' variant='light' color='cyan' radius="md" size="lg" mt={30}>
          See details
        </Button>
      </Card>
    </Box>
    
    <Box maw={430} mah={600} ml={50} mr={50}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1637121409603-3d3a3b6f456c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            height={200}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Costa Rican Surf Trip</Text>
          <Badge color="pink" variant="light">
            New
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
        Getting ready for an adventure in Costa Rica, where we'll be exploring the stunning beaches, hiking through lush rainforests, and experiencing the vibrant culture of the land.
        </Text>

        <Button component={Link} to='/signup' variant='light' color='cyan' radius="md" size="lg" mt={30}>
          See details
        </Button>
      </Card>
    </Box>

    <Box maw={430} mah={600} ml={50} mr={50}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1642700055612-417d545771e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDYyfHx0dXJxdW9pc2UlMjBtZXhpY298ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
            height={200}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Mexican Spicy Trip</Text>
          <Badge color="pink" variant="light">
            New
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
        We'll be savoring the flavors of authentic Mexican cuisine, marveling at the ancient ruins of the Mayan civilization, and soaking up the sun on the beaches of the Riviera Maya!
        </Text>

        <Button component={Link} to='/signup' variant='light' color='cyan' radius="md" size="lg" mt={30}>
          See details
        </Button>
      </Card>
    </Box>
</Flex>










        </>
      );
}


export default HomePage
