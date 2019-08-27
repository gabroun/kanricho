import React from "react";
import Boards from "../components/Dashboard/Boards";
import SignedIn from "../components/SignedIn";
const Home = props => (
  <div>
    <SignedIn>
      <Boards {...props} />
    </SignedIn>
  </div>
);

export default Home;
