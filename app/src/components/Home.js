import React from "react";
import '../styles/Home.scss';
import Portfolio from "./Portfolio";

function Home() {

  return (
    <div id="home">
      <div className="sneakpeak">
      <h1>Hi, I'm Griselda, it's nice to meet you!</h1>
        <Portfolio />
      </div>
    </div>
  );
}


export default Home;