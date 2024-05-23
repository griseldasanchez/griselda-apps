import React from "react";
import PortfolioTile from "./PortfolioTile";

function Portfolio() {
  
  const tiles = Array.from({ length: 1 }, (_, index) => (
    <PortfolioTile key={index} />
  ));

  return (
    <div>
      {tiles}
    </div>
  )
}


export default Portfolio;