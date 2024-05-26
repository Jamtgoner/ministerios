import { useContext } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import ModalD from "./ModalD";
import ModalV from "./ModalV";
import ModalE from "./ModalE";
import { Link } from "react-router-dom";
import { FeligresesContext } from "../context/FeligresesContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.headerTable,
    color: "#ffffff",
    fontSize: 17,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableF() {
  const { feligreses, setFeligreses } = useContext(FeligresesContext);
  const [open, setOpen] = useState(false);
  const [selectedFeligres, setSelectedFeligres] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleOpen = async (feligres, type) => {
    try {
      const response = await fetch(
        `http://localhost:3000/feligres/${feligres.id_feligres}`
      );
      if (!response.ok) {
        console.log("Failed to fetch feligres data");
      }
      const data = await response.json();
      const selectedFeligres = data[0];
      console.log(selectedFeligres);
      setSelectedFeligres(selectedFeligres);
      setModalType(type);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching feligres data:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadFeligreses = async () => {
    try {
      const response = await fetch("http://localhost:3000/feligreses");
      const data = await response.json();
      setFeligreses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFeligreses();
  }, []);

  const handleDelete = async (feligres) => {
    const response = await fetch(
      `http://localhost:3000/feligres/${feligres.id_feligres}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    setFeligreses(
      feligreses.filter((item) => item.id_feligres !== feligres.id_feligres)
    );
    setOpen(false);
  };

  const renderModal = () => {
    if (modalType === "delete") {
      return (
        <ModalD
          open={open}
          accionBotonSi={() => handleDelete(selectedFeligres)}
          accionBotonNo={handleClose}
          titulo={"Eliminacion de Feligres"}
          mensajeGeneral={`Esta a punto de eliminar el feligres ${
            selectedFeligres?.nombre
          } ${selectedFeligres?.p_apellido} ${
            selectedFeligres?.s_apellido || ""
          }. Esta acción es irreversible, esta seguro que desea continuar?`}
        />
      );
    } else if (modalType === "view") {
      return (
        <ModalV
          open={open}
          actBotonClose={handleClose}
          titulo={"Información de Feligres"}
          feligres={selectedFeligres}
        />
      );
    } else if (modalType === "edit") {
      return (
        <ModalE
          open={open}
          actBotonClose={handleClose}
          titulo={"Edición de Feligres"}
          feligres={selectedFeligres}
          reload={loadFeligreses}
        />
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="feligreses table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Dirección</StyledTableCell>
            <StyledTableCell align="center">Telefono</StyledTableCell>
            <StyledTableCell align="center">Correo</StyledTableCell>
            <StyledTableCell align="center">Sexo</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feligreses.map((row) => (
            <StyledTableRow key={row.id_feligres}>
              <StyledTableCell align="center">
                {`${row.nombre} ${row.p_apellido} ${row.s_apellido || ""}`}
              </StyledTableCell>
              <StyledTableCell align="center">{row.direccion}</StyledTableCell>
              <StyledTableCell align="center">{row.telefono}</StyledTableCell>
              <StyledTableCell align="center">{row.correo}</StyledTableCell>
              <StyledTableCell align="center">{row.sexo}</StyledTableCell>

              <StyledTableCell align="center">
                <Link
                  role="button"
                  title="View"
                  data-toggle="tooltip"
                  onClick={() => handleOpen(row, "view")}
                >
                  <i className="material-icons">visibility</i>
                </Link>
                <Link
                  role="button"
                  title="Edit"
                  data-toggle="tooltip"
                  onClick={() => handleOpen(row, "edit")}
                >
                  <i className="material-icons">edit</i>
                </Link>
                <Link
                  className="delete"
                  role="button"
                  title="Delete"
                  data-toggle="tooltip"
                  onClick={() => handleOpen(row, "delete")}
                >
                  <i className="material-icons">delete</i>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {renderModal()}
    </TableContainer>
  );
}
