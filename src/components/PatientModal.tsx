import { Box, Modal } from "@mui/material";
import { usePatientModalStore } from "../store/usePatientModalStore";
import CreatePatient from "./CreatePatient";

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

export default function PatientModal() {
  const show = usePatientModalStore((state) => state.show);
  const handleClose = usePatientModalStore((state) => state.handleClose);
  const view = usePatientModalStore((state) => state.view);
//   const data = usePatientModalStore((state) => state.data);

  return (
    <Modal
      keepMounted
      open={show}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>{view === "add" && <CreatePatient />}</Box>
    </Modal>
  );
}
