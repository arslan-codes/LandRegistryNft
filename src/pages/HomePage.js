import React from "react";
import Layout from "../components/layout/layout";
import "../styles/home.css";
import CountUp from "react-countup";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      src: "./house5.jpg",
    },
    {
      src: "./house6.jpg",
    },
    {
      src: "./house4.jpg",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Layout>
      <section className="hero-wrapper">
        <div className="paddings innerWidth flexCenter hero-container">
          <div className="flexColStart hero-left">
            <div className="hero-title">
              <div className="orange-circle"></div>
              <h1>
                Discover <br />
                Most Suitable <br />
                Property
              </h1>
            </div>
            <div className="hero-des secondaryText flexColStart">
              <span className="secondaryText">
                Find a variety of properties that suit you very easilty
              </span>
              <span className="secondaryText">
                Forget all difficulties in buying and selling a residence
              </span>
            </div>
            <div className="flexCenter stats">
              <div className="flexColCenter stat">
                <span>
                  <CountUp start={800} end={1000} duration={4} />
                  <span>+</span>
                </span>
                <span className="secondaryText">total properties</span>
              </div>
              <div className="flexColCenter stat">
                <span>
                  <CountUp start={150} end={300} duration={4} />
                  <span>+</span>
                </span>
                <span className="secondaryText">sold properties</span>
              </div>
              <div className="flexColCenter stat">
                <span>
                  <CountUp end={20} />
                  <span>+</span>
                </span>
                <span className="secondaryText">neariest properties</span>
              </div>
            </div>
          </div>
          <div className="flexCenter hero-right">
            <div className="image_container">
              <img src="./hero_img.avif" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="value" className="v-wrapper">
        <div className="paddings innerWidth flexCenter v-container">
          {/* left side */}
          <div className="v-left">
            <div className="image-container">
              <img src="./hero-image.png" alt="" />
            </div>
          </div>

          {/* right */}
          <div className="flexColStart v-right">
            <span className="orangeText">Our Value</span>

            <span className="primaryText">Value We Give To You</span>

            <span className="secondaryText">
              We can provide transparency, security, efficiency, and
              trustworthiness. Through transparent and immutable records, it
              ensures the integrity of property ownership data, reducing the
              potential for disputes and fraud.
              <br />
              Enhanced security features safeguard sensitive information, while
              automated processes improve efficiency and reduce administrative
              overhead.Our products help agents and title companies migrate to
              closing on blockchain.
            </span>
          </div>
        </div>
      </section>

      <section className="carousel-container">
        <div className="carousel">
          {items.map((item, index) => (
            <div
              key={index}
              className={`item ${index === activeIndex ? "active" : ""}`}
            >
              <img src={item.src} alt={`Image ${index + 1}`} />
              <p className="caption">{item.caption}</p>
            </div>
          ))}
        </div>
        <button className="btn prev" onClick={handlePrev}>
          Prev
        </button>
        <button className="btn next" onClick={handleNext}>
          Next
        </button>
        <div className="dots">
          {items.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="heading-section">
            <h2>Our Services</h2>
            <div className="sub-heading">
              <div className="service">
                <div className="icon">
                  <img src="./transaction.png" alt="Icon 1" />
                </div>
                <div className="service-content">
                  <h3>Transparent Transactions</h3>
                  <p>
                    {" "}
                    Blockchain technology allows for full transparency in
                    transactions, ensuring all parties have access to the same
                    information and reducing the risk of fraud.
                  </p>
                </div>
              </div>
              <div className="service">
                <div className="icon">
                  <img src="./secure.png" alt="Icon 2" />
                </div>
                <div className="service-content">
                  <h3>Secure Land Titles</h3>
                  <p>
                    {" "}
                    With blockchain, land titles can be securely stored and
                    transferred, reducing the risk of title disputes and making
                    the process more efficient.
                  </p>
                </div>
              </div>
              <div className="service">
                <div className="icon">
                  <img src="./process.png" alt="Icon 3" />
                </div>
                <div className="service-content">
                  <h3>Efficient Process</h3>
                  <p>
                    {" "}
                    Blockchain can streamline the process of buying and selling
                    land by reducing the need for intermediaries and making
                    transactions faster and more efficient.
                  </p>
                </div>
              </div>
              <div className="service">
                <div className="icon">
                  <img src="./sell (2).png" alt="Icon 4" />
                </div>
                <div className="service-content">
                  <h3>Escrow Contract</h3>
                  <p>
                    The escrow holds the deposited tokens until the payment
                    conditions are satisfied. Context. The parties involved in
                    the transaction need to ensure that both the agreed
                    product/service is delivered and payment is made.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <section className="title container">
            <div className="row">
              <div className="col-md-12 main_heading">
                <h1>Blogs</h1>
              </div>
            </div>
          </section>
          {/* Start Blog Layout */}
          <div className="container">
            <div className="row">
              <div className="col-md-6 item">
                <div className="item-in">
                  <h4>
                    Real-World Examples of Blockchain Real Estate Companies in
                    2024
                  </h4>
                  <div className="seperator" />
                  <p>
                    The real estate sector often grapples with challenges,
                    ranging from inefficiencies in property transactions to the
                    lack of transparency in property transfers. As per a report,
                    $1.9 billion was lost due to real estate and rental frauds
                    in the US in 2020. This statistic clearly highlights the
                    growing need for a solution that can make real estate
                    transactions more secure, rather than allowing it to remain
                    a scammer’s paradise
                  </p>
                  <a href="#">
                    Read More
                    <i className="fa fa-long-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 item">
                <div className="item-in">
                  <h4>
                    How Adoption of Blockchain in Real Estate Changing the
                    Scenario?
                  </h4>
                  <div className="seperator" />
                  <p>
                    Blockchain is proven to hold the potential to revamp every
                    business vertical. For instance, blockchain in real estate
                    has given a clear indication that it has various
                    applications beyond cryptocurrencies and can be the right
                    weapon to tackle the prevailing industrial challenges. A
                    ripple effect of this is that various industries have
                    adopted blockchain technology, even the most traditional
                    ones like real estate.
                  </p>
                  <a href="https://appinventiv.com/blog/blockchain-taking-real-estate-next-level/">
                    Read More
                    <i className="fa fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
