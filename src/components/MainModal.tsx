import { Box, Modal } from "@mui/material";
import CreatePatient from "./CreatePatient";
import { useModalStore } from "../store/useModalStore";
import BarcodeScanner from "./BarcodeScanner";
import CreateCylinderModal from "./CreateCylinderModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 'auto',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function MainModal() {
  const show = useModalStore((state) => state.show);
  const handleClose = useModalStore((state) => state.handleClose);
  const view = useModalStore((state) => state.view);

  return (
    <Modal
      keepMounted
      open={show}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        {view === "add" && <CreatePatient />}
        {view === "barcodeScanner" && <BarcodeScanner />}
        {view === "addCylinder" && <CreateCylinderModal />}
      </Box>
    </Modal>
  );
}
