import React from "react";
import PortfolioTile from "./PortfolioTile";
import '../styles/Portfolio.scss';

function Portfolio() {
  
  const tiles = Array.from({ length: 1 }, (_, index) => (
    <PortfolioTile key={index} />
  ));

  return (
    <div>
      <div className="portfolio-description">Checkout some of my work: </div>
      {tiles}
    </div>
  )
}


export default Portfolio;