import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useCloseTank, useSearchTankByCode } from "../services/tank.service";
import AnnouncementIcon from '@mui/icons-material/Announcement';

type Action = "barcode" | "manual";

enum Step {
  SCAN,
  Action,
}

export default function BarcodeScanner() {
  const [result, setResult] = useState("");

  const [step, setStep] = useState<Step>(Step.SCAN);

  return (
    <Box sx={{ minHeight: 350 }}>
      {step === Step.SCAN && (
        <Scan
          result={result}
          setResult={setResult}
          nextStep={() => setStep(Step.Action)}
        />
      )}
      {step === Step.Action && <TankAction code={result} />}
    </Box>
  );
}

interface ScanProps {
  result: string;
  setResult: (result: string) => void;
  nextStep: () => void;
}

function Scan({ result, setResult, nextStep }: ScanProps) {
  const [action, setAction] = useState<Action>("barcode");
  const [paused, setPaused] = useState(false);

  async function handleSearch() {
    nextStep();
  }

  const { ref } = useZxing({
    onDecodeResult({ getText }) {
      setResult(getText());
      handleSearch();
    },
    paused: paused,
  });

  useEffect(() => {
    if (action === "barcode") {
      setPaused(false);
    }

    if (action === "manual") {
      setPaused(true);
    }

    setResult("");

    return () => {
      setPaused(true);
    };
  }, [paused, action]);

  return (
    <Card sx={{ width: 400, minHeight: 350 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {action === "barcode" ? (
            <video ref={ref} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Código de barras"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              color="primary"
              size="large"
            >
              Buscar
            </Button>
          </Box>
        )}

        <Button
          onClick={() => setAction(action === "barcode" ? "manual" : "barcode")}
          variant="contained"
          color="primary"
          size="large"
        >
          {action === "barcode"
            ? "Ingresar Manualmente"
            : "Escanear"}
        </Button>
      </CardContent>
    </Card>
  );
}

interface ActionProps {
  code: string;
}

function TankAction({ code }: ActionProps) {
  const { data, isLoading } = useSearchTankByCode(code);

  const { mutate: closeTank, isPending } = useCloseTank();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        p: 2,
        width: 300,
        height: 350,
      }}
    >
      {isLoading && <Typography variant="h6">Cargando...</Typography>}
      {(!data && !isLoading)&& (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", justifyContent: "center", height: "100%" }}>
          <AnnouncementIcon sx={{ fontSize: 100, color: "yellow" }} />
          <Typography variant="h6">No se encontró el tanque</Typography>
        </Box>
        )}
      {data && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <Typography variant="h6">Acción</Typography>

          <Button variant="contained" color="primary" size="large" onClick={() => closeTank(data.id)} disabled={isPending}>
            { isPending ? "Cerrando..." : "Cerrar tanque" }
          </Button>
        </Box>
      )}
    </Box>
  );
}
