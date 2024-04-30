import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Col, Row } from "antd";

export default function ModalC({ open, handleClose }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await fetch(`http://localhost:3000/feligres`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    handleClose();
    reset();
  });

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalstyle}
    >
      <Box sx={style}>
        <form onSubmit={onSubmit} className="formulario">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            {...register("nombre", {
              required: true,
            })}
          />
          {errors.nombre && <span>El nombre es un campo obligatorio</span>}

          <label>Primer Apellido</label>
          <input
            type="text"
            name="p_apellido"
            {...register("p_apellido", {
              required: true,
            })}
          />
          {errors.p_apellido && (
            <span>El apellido es un campo obligatorio</span>
          )}

          <label>Segundo Apellido</label>
          <input type="text" name="s_apellido" {...register("s_apellido")} />

          <label>Direccion</label>
          <input
            type="text"
            name="direccion"
            {...register("direccion", {
              required: true,
            })}
          />
          {errors.direccion && (
            <span>La dirección es un campo obligatorio</span>
          )}

          <label>Telefono</label>
          <input
            type="tel"
            name="telefono"
            {...register("telefono", {
              required: {
                value: true,
                message: "El telefono es un campo obligatorio",
              },
              pattern: {
                value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                message: "El telefono debe tener el formato 123-456-7890",
              },
            })}
          />
          {errors.telefono && <span>{errors.telefono.message}</span>}

          <label>Correo</label>
          <input type="email" name="correo" {...register("correo")} />

          <label htmlFor="sexo">Sexo</label>
          <select name="sexo" id="sexo" {...register("sexo")}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <Stack
            spacing={2}
            justifyContent="center"
            direction="row"
            sx={{ mt: 2 }}
          >
            <ButtonSave type="submit">
              <SaveIcon />
            </ButtonSave>
            <ButtonClose
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </Stack>
        </form>
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

const ButtonSave = styled(IconButton)(() => ({
  color: "#fff",
  backgroundColor: "#078b1d",
  "&:hover": {
    backgroundColor: "#69df5e",
  },
}));
