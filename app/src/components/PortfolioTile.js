import React from "react";
import { useState, useEffect } from "react";
import '../styles/PortfolioTile.scss';

import { db } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';

import worksheet from '../assets/worksheet.png';

function PortfolioTile() {

  const [projectList, setProjectList] = useState([]);
  const projectCollectionRef = collection(db, "portfolio");

  const getProjects = async () => {
    try {
      const data = await getDocs(projectCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));      
      // console.log(filteredData);
      setProjectList(filteredData);

    } catch (err) {
      console.log('error on Portfolio tile: ', err);
    }
  }

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <div>
      {projectList.map((project) => (       
        <div className="tile" key={project.id}>
          {project.image ? (
            <img src={project.image} alt="Project Image" />
          ) : (
            <img src="https://via.placeholder.com/200" alt="Standard Image" />
          )}

          <div className="tile-content">
            <div className="tile-header">{project.name}</div>
            <div className="tile-description">
              {project.description}
            </div>
            <div className="github-link">
              <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub Link</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PortfolioTile;