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

export default function TableF() {
  const [feligreses, setFeligreses] = useState([]);

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
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">
                {`${row.nombre} ${row.p_apellido} ${row.s_apellido}`}
              </StyledTableCell>
              <StyledTableCell align="center">{row.direccion}</StyledTableCell>
              <StyledTableCell align="center">{row.telefono}</StyledTableCell>
              <StyledTableCell align="center">{row.correo}</StyledTableCell>
              <StyledTableCell align="center">{row.sexo}</StyledTableCell>
              <StyledTableCell align="center">
                <a href="#" className="view" title="View" data-toggle="tooltip">
                  <i className="material-icons visibility">visibility</i>
                </a>
                <a href="#" className="edit" title="Edit" data-toggle="tooltip">
                  <i className="material-icons">edit</i>
                </a>
                <a
                  href="#"
                  className="delete"
                  title="Delete"
                  data-toggle="tooltip"
                >
                  <i className="material-icons">delete</i>
                </a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
