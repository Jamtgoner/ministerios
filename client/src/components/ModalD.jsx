import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

export default function ModalD({
  open,
  accionBotonSi,
  accionBotonNo,
  mensajeGeneral,
  titulo,
}) {
  return (
    <Modal
      open={open}
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
          <ButtonSi
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={accionBotonSi}
          >
            Si
          </ButtonSi>
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

//#region ESTILOS
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  backgroundColor: "#fff",
  boxShadow: 2,
  p: 4,
  borderRadius: 3,
};

const modalstyle = {
  "& .MuiModal-backdrop": {
    backgroundColor: "#00000033",
  },
};

const ButtonSi = styled(Button)(() => ({
  color: "#fff",
  backgroundColor: "#f44336",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
}));

const ButtonNo = styled(Button)(() => ({
  color: "#fff",
  backgroundColor: "#8e8b8b",
  "&:hover": {
    backgroundColor: "#bdbcbc",
  },
}));
