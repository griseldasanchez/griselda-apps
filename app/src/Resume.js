import React from "react";
import './styles/Resume.scss';
import ContactForm from "./ContactForm";

function Resume() {

  const docUrl = "https://docs.google.com/document/d/1sYl6Jevm_kP1qp0FC0CQWiZfnELCW3eTvOYEOiUaUqY/preview"; // Replace with your embed link

  return (
    <div id="resume">
      <ContactForm />
        <iframe
          src={docUrl}
          allow="autoplay"
          title="Google Docs Viewer"
        ></iframe>
    </div>
  )

}

export default Resume;