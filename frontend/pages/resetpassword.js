import ResetPassword from "../components/ResetPassword";

const resetPassword = props => (
  <div>
    <ResetPassword resetToken={props.query.resetToken} />
  </div>
);

export default resetPassword;
