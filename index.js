const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Optional: force HTTPS redirect
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Proxy all traffic to Dynmap server
app.use(
  "/",
  createProxyMiddleware({
    target: "http://139.99.38.79:8123",
    changeOrigin: true,
    ws: true, // for WebSockets
  })
);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
