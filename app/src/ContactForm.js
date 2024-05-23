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

        let serverUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/contact' : 'https://griseldas.web.app/contact';
        
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
        <div className="image-background">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Contact" />
        </div>
        

        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <div className="column">
              {/* Input fields */}
              <div className="field">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required />
              </div>
              <div className="field">
                <label htmlFor="message">Message:</label>
                <textarea id="message" required />
              </div>
              <button type="submit">{status}</button>
            </div>
          </div>
        </form>
      </div>    
    );
}

export default ContactForm;
