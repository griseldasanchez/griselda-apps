import React, { useState } from "react";

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
        
        try {
            let response = await fetch("http://localhost:3000/resume", {
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
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message. Please try again later.");
            setStatus("Submit");
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required/> 
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required/> 
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" required/> 
            </div>
            <button type="submit">{status}</button>
        </form>
    );
}

export default ContactForm;
