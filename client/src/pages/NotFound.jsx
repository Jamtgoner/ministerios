import styled from "styled-components";
import error from "../assets/404.png";

export function NotFound() {
  return (
    <Container>
      <Image src={error} alt="Error 404" />
      <p className="text-center">
        La página que estás buscando no existe. Por favor, verifica la URL e
        inténtalo de nuevo.
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  & p {
    font-weight: bold;
    color: #ff7b7b;
    font-size: 3.5rem;
  }
`;

const Image = styled.img`
  max-width: 50%;
  max-height: 50%;
`;

export default NotFound;
