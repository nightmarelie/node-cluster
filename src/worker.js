const http = require("http");
const pid = process.pid;
const PORT = 8800;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {}
    res.end("Hii");
  })
  .listen(PORT, () => {
    console.log(`Server started. Process: ${pid}`);
  });
