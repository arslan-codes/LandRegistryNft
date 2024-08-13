import React from "react";
import Layout from "../components/layout/layout";
import "../styles/blog.css";

import { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      const sidebarLinks = document.querySelectorAll(".sidebar a");

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id");
        const rect = section.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          sidebarLinks.forEach((link) => {
            if (link.getAttribute("href").slice(1) === sectionId) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
          section.classList.add("animate");
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Layout>
      <div className="sidebar" id="sidebar">
        <a href="#section1" className="active">
          Asset Tokenization: What It Is and How It Works
        </a>
        <a href="#section2">What Is Asset Tokenization?</a>
        <a href="#section3">Benifits of Asset Tokenization</a>
        <a href="#section4">The Need for Oracles in Asset Tokenization</a>
        <a href="#section5">Conclusion</a>
      </div>
      <div classname="blog">
        <div className="content">
          <div id="section1" className="section active secondaryText w-75">
            <h1 className="primaryText">
              Asset Tokenization: What It Is and How It Works
            </h1>
            <p>
              <br />
              ASSET TOKENIZATION DEFINITION
              <br />
              Asset tokenization involves representing the ownership rights of
              real-world assets as digital tokens on a blockchain.
              <br />
              Key Takeaways:
              <br />
              <ul>
                <li>
                  Asset tokenization has the potential to bring trillions of
                  dollars of real-world value onto blockchain networks
                </li>
                <li>
                  Tokenized assets benefit from permissionless liquidity, open
                  access, on-chain transparency, and reduced transactional
                  friction compared to traditional assets
                </li>
                <li>
                  Tokenized assets require high-quality off-chain data from
                  secure and reliable Chainlink oracles
                </li>
              </ul>{" "}
              <p>
                “Asset tokenization” is a term for the use of smart contract and
                blockchain technology to represent ownership or rights to an
                asset as tradable, on-chain token. Though it most commonly
                refers to the tokenization of financial or fungible assets, such
                as shares in a company or a quantity of gold, asset tokenization
                can hypothetically refer to the tokenization of anything
                possessing monetary value. As such, asset tokenization is among
                the most promising use cases for blockchain, with the upper
                bound of asset tokenization market size potentially encompassing
                nearly all of human economic activity—a dollar number estimated
                to be worth well over a hundred trillion annually. As anyone
                familiar with the oracle problem knows, any instance where a
                Web3 application needs to interact with the external world can
                present security risks and other complications, and asset
                tokenization—a process that by nature relies on information
                about the world that is generally off-chain—is no exception.
                Secure oracles are key for asset tokenization to reach its full
                potential, as markets need reliable information about the
                underlying assets in several key processes such as minting,
                trading, managing, and more.
              </p>
              <div className="text-center w-50 ">
                <img
                  src="/token.png"
                  alt="Arslan"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </p>
          </div>
          <div id="section2" className="section secondaryText w-75">
            <h1 className="primaryText">What Is Asset Tokenization?</h1>
            <p>
              Digital asset tokenization is the process whereby ownership rights
              of an asset are represented as digital tokens and stored on a
              blockchain. In such cases, tokens can act like digital
              certificates of ownership that can represent almost any object of
              value, including physical, digital, fungible, and non-fungible
              assets. Because they’re stored on a blockchain, owners can
              maintain custody over their assets (if owners are holding them in
              their own secure crypto wallet). If the long-term promise of this
              use case is impressive, so too are the strides toward adoption
              already being made today. Major enterprises, such as Boston
              Consulting Group and ADDX, BlackRock, Deloitte, BNY Mellon, and
              EY, have studied asset tokenization and concluded that it
              possesses the capacity to disrupt multiple industries, including
              the global securities industry. Additionally, Microsoft and
              Vanguard have announced or gone live with projects tokenizing
              industrial assets and securities, respectively. By these metrics,
              asset tokenization is already among the most popular blockchain
              use cases currently achieving real-world enterprise adoption. To
              understand how asset tokenization works and why it matters, let’s
              revisit the basics of Web3 technology: Smart contracts are
              cryptographically secure digital agreements created with computer
              code and stored on a highly secure type of database known as a
              blockchain. In order to issue tokens, a developer writes a smart
              contract on a blockchain that maps positive balances to a series
              of wallet or smart contract addresses, along with functions that
              enable users in control of those addresses to add and subtract
              from those balances. Asset Tokenization Examples
              <br /> Real-world asset tokenization—Real-world assets like fiat
              currency, equities, T-bills, credit, commodities, carbon credits,
              intellectual property, and fine art can be tokenized and stored on
              a blockchain. Similar to gold bullion warrants and house deeds,
              they’re bearer assets that give the holder a claim over a
              real-world asset. The key difference from legacy bearer assets is
              that physical asset tokenization enables assets to be stored,
              traded, and used as collateral across blockchain networks.
              <br /> ‍ Digital asset tokenization—Tokenizing assets that only
              exist in a digital form on a blockchain network is critical to
              Web3, especially for use cases such as representing DAO governance
              rights and cross-chain assets. Because they’re entirely digital,
              tokenized assets stored on a blockchain enable the owner to hold
              the asset outright, rather than owning a claim on the underlying
              asset. <br /> In-game asset tokenization—A subset of digital asset
              tokenization, in-game assets used in GameFi projects or
              metaverses, such as skins, weapons, or in-game currencies, can be
              represented as tokenized assets.
            </p>
            <div className="text-center w-75 ">
              <img
                src="/assetstoken.png"
                alt="Arslan"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div id="section3" className="section secondaryText w-75">
            <h1 className="primaryText">Benifits of Asset Tokenization</h1>
            <p>
              Potential benefits The decentralized standard system for
              <strong> land registration</strong> records will reduce the role
              of intermediaries, decrease the time and cost of the process and
              the system will strengthen the process and will build the trust
              between the transacting parties. Recording rights of property
              through Blockchain will help in annual cost savings and provide
              tamper-proof ledger book. Blockchain usually reduces the
              expenditure and time of registration process and will help
              Judiciary to settle down most of the civil cases related to
              property. The benefits of using Blockchain in land registry system
              summarized in the following points:
              <ol>
                <li>
                  Transparency: Every node has a complete overview of
                  transactions and holds a history of the transactions that can
                  be visible from anywhere at any time.
                </li>
                <li>
                  Increased trust: Trust build due to immutable record keeping
                  and verification of data at multiple nodes.
                </li>
                <li>
                  Increase predictive capability: History information stored at
                  multiple nodes can be traced back, that increases the
                  predictive capability.
                </li>
                <li>
                  Reliability: Data is stored in multiple places in the
                  blockchain based system. Consensus mechanisms ensure that only
                  information changes when all relevant parties agree.
                </li>
                <li>
                  Increased control: Consensus mechanism to add transaction
                  increases the control over the database.
                </li>
                <li>
                  Cost reduction: Cost decreases as no human third party
                  involved in conducting and validating the data.
                </li>
                <li>
                  Reduced energy consumption: Increased efficiency and
                  transaction mechanisms through network reduces the energy
                  consumption.
                </li>
                <li>
                  Security: Data is stored at multiple systems using encryption
                  methods that stop the data from being altered without proper
                  authentication.
                </li>
                <li>
                  Ease of access: Information stored at multiple nodes, enhances
                  easy and speedy access.
                </li>
                <li>
                  Ease of access: Information stored at multiple nodes, enhances
                  easy and speedy access
                </li>
                <li>
                  Privacy: The information must be secure from secret
                  surveillance. Users need secret keys or access mechanism to
                  ensure that the information is safe from unauthorized view.
                </li>
                <li>
                  Reducing corruption: Distributed ledgers storage allows for
                  preventing corruption in land ownership due to the secure and
                  reliable mechanism of transfer and changing ownership records
                </li>
                <li>
                  Error reduction: Automated transactions reduces chances of
                  errors done by humans.
                </li>
                <li>
                  Data integrity and higher quality: Not accessed by hackers or
                  unauthorized users mean the originality of the data
                  maintained.
                </li>
              </ol>
            </p>
          </div>
          <div id="section4" className="secondaryText w-75">
            <h1 className="primaryText">
              The Need for Oracles in Asset Tokenization
            </h1>
            <p className="secondaryText">
              <br />
              While asset tokenization has the potential to enhance the utility
              of a wide variety of real-world assets and simultaneously buttress
              growth and innovation within the DeFi space, it is also a use case
              whose functionality is highly reliant on secure oracles. In order
              for something of monetary value to be accurately represented and
              traded on the blockchain, there must be good information on the
              asset. This need is especially acute at four stages in a tokenized
              asset’s life cycle: when the tokens are created, when they are
              used as collateral, when users check their valuations, and when
              they are sold on secondary markets.
              <br />
              Chainlink Proof of Reserve
              <br />
              Tokenized asset projects can use a decentralized verification
              service, Chainlink Proof of Reserve, to help relay this off-chain
              information on-chain. Chainlink PoR provides unparalleled
              transparency into off-chain collateral, helping enhance the
              security and verifiability of tokenized assets. By using Chainlink
              PoR’s decentralized verification mechanism to relay
              collateralization data, tokenization projects can demonstrate a
              new level of transparency and security.Leading tokenization
              projects are already utilizing or integrating Chainlink Proof of
              Reserve to help relay off-chain valuation data on-chain,
              including:
              <br />
              <ul>
                <li>
                  OpenEden for tokenized T-bills ‍<br />
                </li>
                <li>
                  Backed Finance for tokenized equities‍
                  <br />
                </li>
                <li>
                  TUSD and Poundtoken for tokenized fiat currency
                  <br />
                </li>
                <li>
                  {" "}
                  Fortunify for tokenized credit‍
                  <br />
                </li>
                <li>
                  Cache Gold for tokenized gold
                  <br />
                </li>
              </ul>
              Some tokenization projects are using Chainlink PoR in an
              additional way—for providing cryptographic guarantees that new
              tokens minted are backed by reserves, thereby helping to prevent
              infinite mint attacks. TUSD, Poundtoken, and Cache Gold are using
              Chainlink PoR Secure Mint in their minting smart contract to help
              ensure reserves are sufficient before minting new tokens.
              <br />
              Different assets will necessitate different oracle network
              structures and needs. Depending on the use case, Chainlink oracles
              can provide direct valuations to assets or serve as benchmarks for
              making decisions on them. Since Chainlink interoperates with any
              API and off-chain system, Chainlink oracles are able to source
              this data from multiple avenues, such as professional data
              providers (e.g. Kelly Blue Book for cars), independent/expert
              appraisers, exchanges/OTC markets, or any customized aggregation
              of data sources to create a single trusted valuation. This can be
              supported by a decentralized network of independent Chainlink
              nodes that call off-chain APIs to retrieve data or the data
              providers/appraisers can run Chainlink oracles themselves to relay
              data directly to smart contracts.
              <br />
              In order to further preserve the integrity of the network and
              maintain a high degree of data quality, unique crypto-economic
              incentives can be bootstrapped on to the oracle network. Methods
              like staking-backed service agreements and immutable reputation
              systems are able to track the historical quality of the valuations
              provided by appraisers, nodes, data providers, and more. This
              framework will incentivize accurate valuations as dishonest
              valuations will be financially penalized and their reputation
              score lowered, hindering their ability to earn future revenue as a
              data provider. It will also allow even niche and esoteric assets
              which rely on expert appraiser information to enter into the
              tokenized market while maintaining stronger crypto-economic
              guarantees that the valuation data is sound.
              <br />
              Cross-Chain Interoperability Protocol (CCIP)
              <br />
              Some tokenized assets need to be interoperable across different
              computing environments to access a broader pool of liquidity and a
              larger number of users across different platforms and ecosystems.
              The Cross-Chain Interoperability Protocol (CCIP) is designed to
              help eliminate the need for developers to write custom code for
              building chain-specific integrations and help make native
              cross-chain tokenized assets.
            </p>
          </div>
          <div id="section5" className="section secondaryTextw-75">
            <h1 className="primaryText">Conclusion</h1>
            Though still in its early stages, asset tokenization is one of the
            most exciting and highest ceiling use cases for blockchain
            technology. However, without robust and secure oracles like
            Chainlink, tokenization will be limited in the value it can produce
            on-chain and be subject to centralization risks, which cuts into the
            very value proposition it was designed to create. Only by deploying
            Chainlink decentralized oracles to access real-world information
            will this promising technology reach its full potential of bringing
            added value to any asset around the world.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
