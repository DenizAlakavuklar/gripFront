import React from 'react'
import { Box, Text, Flex, Divider, Blockquote, Grid } from '@mantine/core'
import { Link } from 'react-router-dom'




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
                <h2>Grip </h2>
                </Text>
                <Text color="white" mt={-20}>
                Simplifying traveling
                </Text>
            </Flex>

            <Divider my="sm" variant="dotted" />

            <Flex  justify="center" direction="row">
                    <Box  >
                        <Blockquote cite="– Forrest Gump">
                            Life is like an npm install – you never know what you are going to get.
                        </Blockquote>
                    </Box>
             </Flex>
        </Box>

    </>

)


}


export default Footer