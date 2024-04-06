import styled from "styled-components";
import TableF from "../components/TableF";

export function Feligreses() {
  return (
    <Container className="p-2">
      <h1 className="text-center">Feligreses</h1>
      <TableF />
    </Container>
  );
}

const Container = styled.div``;
export default Feligreses;
