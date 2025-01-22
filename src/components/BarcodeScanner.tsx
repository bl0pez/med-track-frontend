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

  //   async function approveOrderItem() {

  //   }

  return (
    <Box>
      <video ref={ref} style={{ width: "100%", height: "100%" }} />

      <Box>
        <Typography variant="h6">Result: {result}</Typography>
        <Button onClick={() => setPaused(!paused)}>Pause</Button>
      </Box>
    </Box>
  );
}
