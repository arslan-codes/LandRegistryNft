import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import "../styles/contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    emailjs.init("aaQOWCEujXVGVTSw7");
  }, []);

  const sendEmail = () => {
    emailjs
      .send("service_tt3qg4v", "template_7eyyeql", {
        to_email: "arslanmazharnfts@gmail.com",
        from_email: senderEmail,
        message: message,
      })
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Mail sent successfully!");
      })
      .catch(function (error) {
        console.error("FAILED...", error);
        alert("Failed to send mail!");
      });
  };

  return (
    <Layout>
      <section className="contact ">
        <div className="contact_container">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt" />
                <div className="topic">Address</div>
                <div className="text-one">UNIVERSITY OF WAH</div>
                <div className="text-two">WAH CANTT</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt" />
                <div className="topic">Phone</div>
                <div className="text-one">+0092 332 4320594</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope" />
                <div className="topic">Email</div>
                <div className="text-one">arslanmazharnfts@gmail.com</div>
              </div>
            </div>
            <div className="right-side">
              <div className="topic-text">Send us a message</div>
              <p>
                If you have any work from us or any types of queries, you can
                send us a message from here. We will be pleased to help you.
              </p>
              <form>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="button">
                  <input type="button" value="Send Now" onClick={sendEmail} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <div class="container">
            <h1 class="mt-5 mb-4">User Support Guide</h1>
            <div class="row">
              <div class="col-md-6">
                <ul>
                  <li>
                    <strong>Technical Issues:</strong> Users may encounter bugs,
                    errors, or unexpected behavior.
                  </li>
                  <li>
                    <strong>Account Management:</strong> Help with signing up,
                    logging in, updating profile information, or resetting
                    passwords.
                  </li>
                  <li>
                    <strong>Property Listing:</strong> Assistance with uploading
                    property details, setting prices, or understanding listing
                    requirements.
                  </li>
                  <li>
                    <strong>Transaction Support:</strong> Help with buying or
                    selling properties, processing payments, or resolving
                    transaction issues.
                  </li>
                  <li>
                    <strong>Blockchain and Cryptocurrency:</strong> Explanation
                    of blockchain, cryptocurrencies, or platform's interaction
                    with these technologies.
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul>
                  <li>
                    <strong>Smart Contracts:</strong> Clarification on how smart
                    contracts work, their role in transactions, or
                    troubleshooting contract-related issues.
                  </li>
                  <li>
                    <strong>Privacy and Security:</strong> Information on data
                    protection, secure transactions, and safeguarding personal
                    information.
                  </li>
                  <li>
                    <strong>General Inquiries:</strong> Answers to questions
                    about platform features, policies, or terms of service.
                  </li>
                  <li>
                    <strong>Feedback and Suggestions:</strong> Encouragement to
                    provide feedback or suggestions for platform improvements.
                  </li>
                  <li>
                    <strong>Contacting Support:</strong> Instructions on how to
                    contact support via email, chat, or support tickets.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
