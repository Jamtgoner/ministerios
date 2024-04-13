import * as React from "react";
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

export default function TableF() {
  const [feligreses, setFeligreses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeligres, setSelectedFeligres] = useState(null);

  const handleOpen = (feligres) => {
    setOpen(true);
    setSelectedFeligres(feligres);
  };

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

  const handleClose = () => {
    setOpen(false);
    setSelectedFeligres(null);
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
                {`${row.nombre} ${row.p_apellido} ${row.s_apellido}`}
              </StyledTableCell>
              <StyledTableCell align="center">{row.direccion}</StyledTableCell>
              <StyledTableCell align="center">{row.telefono}</StyledTableCell>
              <StyledTableCell align="center">{row.correo}</StyledTableCell>
              <StyledTableCell align="center">{row.sexo}</StyledTableCell>

              <StyledTableCell align="center">
                <a
                  className="view"
                  title="View"
                  data-toggle="tooltip"
                  onClick={() => console.log(row)}
                >
                  <i className="material-icons visibility">visibility</i>
                </a>
                <a className="edit" title="Edit" data-toggle="tooltip">
                  <i className="material-icons">edit</i>
                </a>
                <a
                  className="delete"
                  title="Delete"
                  data-toggle="tooltip"
                  onClick={() => handleOpen(row)}
                >
                  <i className="material-icons">delete</i>
                </a>
                <ModalD
                  open={open}
                  onClose={handleClose}
                  accionBotonSi={() => handleDelete(selectedFeligres)}
                  accionBotonNo={handleClose}
                  feligres={selectedFeligres}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
