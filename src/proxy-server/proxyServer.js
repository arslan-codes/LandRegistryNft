import bodyParser from "body-parser";
import Routes from "./Routes.js";
import cors from "cors";
import httpProxy from "http-proxy";

const app = express();
const proxy = httpProxy.createProxyServer();

const port = 8080;

app.use(bodyParser.json());
app.use(cors());

// Proxy middleware for handling requests to /ipfs
app.use("/ipfs", (req, res) => {
  const ipfsEndpoint = "https://ipfs.io"; // IPFS endpoint to proxy requests to
  const target = ipfsEndpoint + req.url;

  // Proxy the request to the IPFS endpoint
  proxy.web(req, res, { target });
});

app.use("/api/v1/auth", Routes);
app.get("/", (req, res) => {
  console.log("welcome to real state");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
