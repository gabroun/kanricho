import Signup from "../components/Signup";
import styled from "styled-components";

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <StyledColumns>
    <Signup />
    {/* <Signup />
    <Signup /> */}
  </StyledColumns>
);

export default SignupPage;
