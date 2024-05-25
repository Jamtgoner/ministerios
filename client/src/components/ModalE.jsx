import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import Stack from "@mui/material/Stack";
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";

export default function ModalE({ open, actBotonClose, feligres, reload }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const defaultValues = {
    nombre: feligres.nombre || "",
    p_apellido: feligres.p_apellido || "",
    s_apellido: feligres.s_apellido || "",
    direccion: feligres.direccion || "",
    telefono: feligres.telefono || "",
    correo: feligres.correo || "",
    sexo: feligres.sexo || "M",
  };

  const onSubmit = handleSubmit(async (data) => {
    await fetch(`http://localhost:3000/feligres/${feligres.id_feligres}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    actBotonClose();
    reset();
    reload();
  });

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalstyle}
    >
      <Box sx={style}>
        <form onSubmit={onSubmit} className="row formulario">
          <div className="col-md-4">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              {...register("nombre", {
                required: true,
              })}
              defaultValue={defaultValues.nombre}
            />
            {errors.nombre && <span>El nombre es un campo obligatorio</span>}
          </div>
          <div className="col-md-4">
            <label>Primer Apellido</label>
            <input
              type="text"
              className="form-control"
              name="p_apellido"
              {...register("p_apellido", {
                required: true,
              })}
              defaultValue={defaultValues.p_apellido}
            />
            {errors.p_apellido && (
              <span>El apellido es un campo obligatorio</span>
            )}
          </div>
          <div className="col-md-4">
            <label>Segundo Apellido</label>
            <input
              type="text"
              className="form-control"
              name="s_apellido"
              {...register("s_apellido")}
              defaultValue={defaultValues.s_apellido}
            />
          </div>

          <div className="col-md-12">
            <label>Direccion</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              {...register("direccion", {
                required: true,
              })}
              defaultValue={defaultValues.direccion}
            />
            {errors.direccion && (
              <span>La dirección es un campo obligatorio</span>
            )}
          </div>

          <div className="col-md-4">
            <label>Telefono</label>

            <InputMask
              mask="999-999-9999"
              name="telefono"
              maskChar=""
              placeholder="809-999-9999"
              className="form-control"
              {...register("telefono", {
                required: "El teléfono es un campo obligatorio",
              })}
              defaultValue={defaultValues.telefono}
            />
            {errors.telefono && <span>{errors.telefono.message}</span>}
          </div>

          <div className="col-md-4">
            <label>Correo</label>
            <input
              type="email"
              name="correo"
              placeholder="correo@dominio.com"
              className="form-control"
              {...register("correo")}
              defaultValue={defaultValues.correo}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="sexo">Sexo</label>
            <select
              name="sexo"
              id="sexo"
              className="form-select"
              {...register("sexo")}
              defaultValue={defaultValues.sexo}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <Stack
            spacing={2}
            justifyContent="center"
            direction="row"
            sx={{ mt: 2 }}
          >
            <ButtonSave type="submit">
              <IoIosSave />
            </ButtonSave>
            <ButtonClose
              onClick={() => {
                actBotonClose();
                reset();
              }}
            >
              <RiCloseCircleFill />
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
