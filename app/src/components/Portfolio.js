import React from "react";
import PortfolioTile from "./PortfolioTile";

function Portfolio() {
  
  const tiles = Array.from({ length: 1 }, (_, index) => (
    <PortfolioTile key={index} />
  ));

  return (
    <div>
      <p>
        Check out some of my work: 
      </p>
      {tiles}
    </div>
  )
}


export default Portfolio;