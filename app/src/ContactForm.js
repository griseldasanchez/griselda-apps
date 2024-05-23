import React, { useState } from "react";
import './styles/ContactForm.scss';

const ContactForm = () => {
    const [status, setStatus] = useState("Submit");

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        setStatus("Sending...");
        
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        let serverUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/resume' : 'https://griseldas.web.app/resume';
        
        try {
            let response = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(details)
            });

            if (!response.ok) {
              throw new Error("Failed to send message. Please try again later.");
            }
            
            setStatus("Submit");
            let result = await response.json();
            alert(result.status);

            console.log('serverURL', serverUrl);
            
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message. Please try again later.");
            setStatus("Submit");
            console.log('serverURL error:', serverUrl);
        }
    };
    
    return (
    <div id="contact-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required/>
    
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required/>
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" required/>
          </div>
        </div>
        <button type="submit">{status}</button>
      </form>
    </div>
    
    );
}

export default ContactForm;
