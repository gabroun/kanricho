import Signup from "../components/Signup";
import Signin from "../components/Signin";
import styled from "styled-components";

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 80px;
`;

const SignupPage = props => (
  <StyledColumns>
    <Signup />
    <Signin />
    {/* <Signup />
    <Signup /> */}
  </StyledColumns>
);

export default SignupPage;
