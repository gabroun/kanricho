import React from "react";
import Link from "next/link";
const Home = props => (
  <div>
    <h2>A new way to manage your work</h2>
    <p>By organising your projects into boards, lists and cards.</p>
    <Link href="/signup">
      <a>
        <span className="header__title" style={{ color: "blue" }}>
          Get Started
        </span>
      </a>
    </Link>
  </div>
);

export default Home;
