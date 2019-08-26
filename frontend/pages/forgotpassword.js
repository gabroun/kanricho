import RequestReset from "../components/RequestReset";
import styled from "styled-components";

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 600px);
  grid-gap: 80px;
  justify-content: center;
`;

const ForgotPassword = props => (
  <StyledColumns>
    <RequestReset />
  </StyledColumns>
);

export default ForgotPassword;
