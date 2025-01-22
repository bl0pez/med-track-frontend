import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useZxing } from "react-zxing";

export default function BarcodeScanner() {
  const [result, setResult] = useState("");
  const [paused, setPaused] = useState(false);
  //   const [orderItem, setOrderItem] = useState<OrderItem | null>();
  //   const { addToast } = useToast();
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log(result);
      setResult(result.getText());
      setPaused(true);
    },
    paused: paused,
  });

    async function approveOrderItem() {
        setResult('');
        setPaused(false);
    }

  return (
    <Box width={1} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" sx={{ height: '500px'}}>
      <video ref={ref} />

      <Box>
        <Typography variant="h6">Result: {result}</Typography>
        <Button onClick={approveOrderItem} variant="contained" color="primary" size="large" sx={{ margin: '20px' }}>
          Escanear código de barras
        </Button>
      </Box>
    </Box>
  );
}
