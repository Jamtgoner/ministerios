import estilo from "styled-components";
import { styled } from "@mui/material/styles";
import TableF from "../components/TableF";
import IconButton from "@mui/material/IconButton";
import { IoMdPersonAdd } from "react-icons/io";
import { useState } from "react";
import ModalC from "../components/ModalC";

export function Feligreses() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="p-2">
      <h1 className="text-center">Feligreses</h1>
      <AddButton className="m-2" onClick={handleOpen}>
        <IoMdPersonAdd />
      </AddButton>
      <TableF />
      <ModalC open={open} handleClose={handleClose} />
    </Container>
  );
}

const Container = estilo.div``;

const AddButton = styled(IconButton)(() => ({
  color: "#fff",
  backgroundColor: "#0baa05",
  "&:hover": {
    backgroundColor: "#69df5e",
  },
}));

export default Feligreses;
