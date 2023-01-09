const http = require("http");
const pid = process.pid;
const PORT = 8800;

const server = http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {}
    res.end("Hii");
  })
  .listen(PORT, () => {
    console.log(`Server started. Process: ${pid}`);
  });

process.on("SIGINT", () => {
  console.log("Signal is SIGINT");
  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Signal is SIGTERM");
  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGUSR2", () => {
  console.log("Signal is SIGUSR2");
  server.close(() => {
    process.exit(1);
  });
});
