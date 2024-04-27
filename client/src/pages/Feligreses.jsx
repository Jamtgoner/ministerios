import { styled } from "@mui/material/styles";
import TableF from "../components/TableF";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Row } from "antd";
import ModalC from "../components/ModalC";
import { useEffect, useState } from "react";

export function Feligreses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Container className="p-2">
      <h1 className="text-center">Feligreses</h1>

      <Row className="p-2">
        <AddButton onClick={handleOpenModal}>
          <PersonAddIcon />
        </AddButton>
      </Row>
      <ModalC open={isModalOpen} handleClose={handleCloseModal} />

      <TableF />
    </Container>
  );
}

const Container = styled("div")(() => ({}));

const AddButton = styled(IconButton)(() => ({
  color: "#fff",
  backgroundColor: "#4CAF50",
  "&:hover": {
    backgroundColor: "#388E3C",
  },
}));

export default Feligreses;
