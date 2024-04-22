import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  borderRadius: 3,
};

const modalstyle = {
  "& .MuiModal-backdrop": {
    backgroundColor: "#00000033",
  },
};

const ButtonNo = styled(Button)(() => ({
  color: "#fff",
  backgroundColor: "#4caf50",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
}));

export default function ModalV({
  open,
  handleClose,
  accionBotonNo,
  mensajeGeneral,
  titulo,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalstyle}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          {titulo}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {mensajeGeneral}
        </Typography>
        <Stack
          spacing={2}
          justifyContent="center"
          direction="row"
          sx={{ mt: 2 }}
        >
          <ButtonNo
            variant="contained"
            startIcon={<NotInterestedIcon />}
            onClick={accionBotonNo}
          >
            No
          </ButtonNo>
        </Stack>
      </Box>
    </Modal>
  );
}
