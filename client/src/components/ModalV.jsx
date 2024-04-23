import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Col, Row } from "antd";
import { Descriptions } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  backgroundColor: "#f4f4f4",
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

export default function ModalV({ open, actBotonClose, titulo, feligres }) {
  const items = feligres
    ? [
        {
          key: "1",
          label: "Nombre",
          children: feligres.nombre,
        },
        {
          key: "2",
          label: "Apellidos",
          children: `${feligres.p_apellido} ${feligres.s_apellido || ""}`,
        },
        {
          key: "3",
          label: "Dirección",
          children: feligres.direccion,
        },
        {
          key: "4",
          label: "Telefono",
          children: feligres.telefono,
        },
        {
          key: "5",
          label: "Correo",
          children: feligres.correo,
        },
        {
          key: "6",
          label: "Sexo",
          children: feligres.sexo === "M" ? "Masculino" : "Femenino",
        },
      ]
    : [];

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalstyle}
    >
      <Box sx={style}>
        <Row>
          <Col span={24}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              className="mb-4"
            >
              {titulo}
            </Typography>
          </Col>
          <Col span={24}>
            <Descriptions items={items} />
          </Col>
          <Col span={12}></Col>
          <ButtonClose onClick={actBotonClose}>
            <CloseIcon />
          </ButtonClose>
        </Row>
      </Box>
    </Modal>
  );
}
