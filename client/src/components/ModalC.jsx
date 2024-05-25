import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSave } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

export default function ModalC({ open, handleClose }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("p_apellido", data.p_apellido);
    formData.append("s_apellido", data.s_apellido);
    formData.append("direccion", data.direccion);
    formData.append("telefono", data.telefono);
    formData.append("correo", data.correo);
    formData.append("sexo", data.sexo);
    formData.append("foto", data.foto[0]);

    await fetch(`http://localhost:3000/feligres`, {
      method: "POST",
      body: formData,
    });
    console.log(data);
    handleClose();
    reset();
    window.location.reload(false);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalstyle}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)} className="row formulario">
          <div className="col-md-4">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              {...register("nombre", {
                required: true,
              })}
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
            />
            {errors.direccion && (
              <span>La dirección es un campo obligatorio</span>
            )}
          </div>

          <div className="col-md-4">
            <label>Telefono</label>

            <InputMask
              mask="999-999-9999"
              maskChar=""
              placeholder="809-999-9999"
              className="form-control"
              {...register("telefono", {
                required: "El teléfono es un campo obligatorio",
              })}
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
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="sexo">Sexo</label>
            <select
              name="sexo"
              id="sexo"
              className="form-select"
              {...register("sexo")}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="formFile" className="form-label">
              Foto
            </label>
            <input
              className="form-control"
              type="file"
              name="foto"
              {...register("foto")}
            />
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
                handleClose();
                reset();
              }}
            >
              <IoMdCloseCircle />
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
  width: "80%",
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
