import styled from "styled-components";
import hombre from "../assets/hombre.png";
import mujer from "../assets/mujer.png";

export function AvatarFeligres({ imagenBytes, sexo }) {
  const imageUrl = `data:image/jpeg;base64,${imagenBytes}`;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <img
        className="rounded-circle img-fluid shadow-lg"
        src={imagenBytes ? imageUrl : sexo === "M" ? hombre : mujer}
        alt="Foto del feligres"
        width="250"
        height="250"
      />
    </Container>
  );
}

const Container = styled.div``;

export default AvatarFeligres;
