import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";

export default function ModalC({ open, handleClose }) {
  const { register } = useForm();

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalstyle}
    >
      <Box sx={style}>
        <form className="formulario">
          <label>Nombre</label>
          <input type="text" name="nombre" {...register("nombre")} />

          <label>Primer Apellido</label>
          <input type="text" name="p_apellido" {...register("p_apellido")} />

          <label>Segundo Apellido</label>
          <input type="text" name="s_apeliido" {...register("s_apeliido")} />

          <label>Direccion</label>
          <input type="text" name="direccion" {...register("direccion")} />

          <label>Telefono</label>
          <input type="text" name="telefono" {...register("telefono")} />

          <label>Correo</label>
          <input type="email" name="correo" {...register("correo")} />

          <label htmlFor="sexo">Sexo</label>
          <select name="sexo" id="sexo" {...register("sexo")}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>

          <button type="submit">Enviar</button>
        </form>
        <ButtonClose onClick={handleClose}>
          <CloseIcon />
        </ButtonClose>
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
  width: "60%",
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

const ButtonClose = styled(IconButton)(() => ({
  color: "#fff",
  backgroundColor: "#ff0000",
  "&:hover": {
    backgroundColor: "#df5e5e",
  },
}));
