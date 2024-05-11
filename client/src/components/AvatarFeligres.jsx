import styled from "styled-components";

export function AvatarFeligres({ imagenBytes }) {
  const imageUrl = `data:image/jpeg;base64,${imagenBytes}`;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <img
        className="rounded-circle img-fluid shadow-lg"
        src={imageUrl}
        alt="Foto del feligres"
        width="250"
        height="250"
      />
    </Container>
  );
}

const Container = styled.div``;

export default AvatarFeligres;
