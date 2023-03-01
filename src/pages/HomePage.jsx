import { Box, Text } from '@mantine/core'

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Text size='xl' weight='bold' align='center'>
        Some place to talk about something like unicorns for example
      </Text>
    </Box>
  )
}

export default HomePage
