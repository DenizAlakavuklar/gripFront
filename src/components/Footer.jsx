import React from 'react'
import { Box, Text, Flex, Divider, Blockquote, Grid } from '@mantine/core'
import { Link } from 'react-router-dom'
import grip_logo from "../images/grip_logo.png"




function Footer() {
return(
    <>
        <Box
            sx={(theme) => ({
                backgroundColor:  theme.colors.gray[8],
                textAlign: 'center',
                padding: theme.spacing.xl,
                cursor: 'pointer',
            })}
            >

            <Flex align="center" justify="center" direction="column">
                <Text color="white">
                <Box ml={20} mb={30}>
                    <img src={grip_logo} width="60" height="75"/>
                </Box>
                
                </Text>
                <Text color="white" mt={-20}>
                Simplify group traveling
                </Text>
            </Flex>

            <Divider my="sm" variant="dotted" />

            <Flex  justify="center" direction="row">
                    <Box  >
                        <Blockquote cite="– Forrest Gump">
                           <Text color="lightgrey" > Life is like an npm install – you never know what you are going to get.</Text>
                        </Blockquote>
                    </Box>
             </Flex>

             <Divider my="sm" variant="dotted" />

             <Grid>
      <Grid.Col span={4}><a href="https://github.com/Lorex-ia" target="_blank" style={{color: "lightgrey", textDecoration: "none"}}>Alexia Lorenza Martinel</a>
</Grid.Col>
      <Grid.Col span={4}><a href="https://github.com/DenizAlakavuklar" target="_blank" style={{color: "lightgrey", textDecoration: "none"}}>Deniz Alakavuklar</a></Grid.Col>
      <Grid.Col span={4} >
      <a href="https://github.com/sorfbourt" target="_blank" style={{color: "lightgrey", textDecoration: "none"}}>Krystina Witt</a>
    </Grid.Col>
    </Grid>
        </Box>

    </>

)


}


export default Footer