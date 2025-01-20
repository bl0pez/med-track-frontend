import { Box, CircularProgress } from "@mui/material"

export const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
        <CircularProgress
          size={100}
          thickness={1}
          color="primary"
        />
    </Box>
  )
}