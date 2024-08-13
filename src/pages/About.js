import React from "react";
import Layout from "../components/layout/layout";
import "../styles/about.css";

const About = () => {
  return (
    <Layout>
      <div>
        <h1 className="top-info">
          {"We believe in a world where barriers to"}
          <br />
          {"real estate ownership are removed"}
        </h1>
        <div>
          <p className="top-info2">
            {
              "We believe in a world where real estate transactions are “self-driving"
            }
            <br />
            {"and REALTORS® are empowered by technology."}
          </p>
        </div>
        <div>
          <p className="heading2">OUR MISSION</p>
          <br></br>
          <p className="top-info3">
            {"Self-driving transactions for agents, home"}
            <br />
            {"buyers and sellers"}
          </p>
        </div>
        <div className="container ">
          <div className="imag1">
            <img className="image1" src="./propy-platform (1).png" alt="" />
            <div className="text">
              <p className="text1">
                {" "}
                We are automating the closing process for all real estate
                purchase participants to make closing faster, easier and more
                secure. Our products help agents and title companies migrate to
                closing on blockchain.
              </p>
            </div>
          </div>
        </div>
        <p className="heading2">FAQS</p>
        <div className="faqs">
          <div className="faq-header ">Frequently Asked Questions</div>
          <div className="faq-content">
            <div className="faq-question">
              <input id="q1" type="checkbox" className="panel" />
              <div className="plus">+</div>
              <label htmlFor="q1" className="panel-title">
                {" "}
                What is a blockchain-based decentralized land registry system?
              </label>
              <div className="panel-content">
                It's a digital platform using blockchain for secure and
                transparent property ownership records without a central
                authority.
              </div>
            </div>
            <div className="faq-question">
              <input id="q2" type="checkbox" className="panel" />
              <div className="plus">+</div>
              <label htmlFor="q2" className="panel-title">
                Role of smart contracts?
              </label>
              <div className="panel-content">
                Smart contracts automate property agreements, like transfers and
                payments, based on predefined conditions.
              </div>
            </div>
            <div className="faq-question">
              <input id="q3" type="checkbox" className="panel" />
              <div className="plus">+</div>
              <label htmlFor="q3" className="panel-title">
                Benefits of using this system?
              </label>
              <div className="panel-content">
                Reduced fraud, increased transparency, faster transactions,
                lower costs, and enhanced security.{" "}
              </div>
            </div>
            <div className="faq-question">
              <input id="q4" type="checkbox" className="panel" />
              <div className="plus">+</div>
              <label htmlFor="q4" className="panel-title">
                Limitations or challenges?
              </label>
              <div className="panel-content">
                Challenges include scalability, regulatory complexities,
                adoption barriers, privacy concerns, and ongoing technological
                advancements.{" "}
              </div>
            </div>
          </div>
        </div>

        <p className="heading2">OUR TEAM</p>
        <div className="team">
          <div className="team-member">
            <img src="./arslan2.png" alt="Team Membe~r" />
            <h3 className="text-dark">Muhammad Arslan</h3>
            <p>Leader</p>
          </div>
          <div className="team-member me">
            <img src="./myself.jpg" alt="Team Member" />
            <h3 className="text-dark">Muhammad Abdullah</h3>
          </div>
          <div className="team-member">
            <img src="./member2.jpg" alt="Team Member" />
            <h3 className="text-dark">Sharjeel Babar</h3>
          </div>
        </div>
        <div>
          <h1 className="top-info">
            {"Buy and sell homes – faster, easier"}
            <br />
            {"and more securely"}
          </h1>
          <p className="top-info2">Powered by Web3 Technology</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
