const http = require("http");
const pid = process.pid;
const PORT = 8800;

http
  .createServer((req, res) => {
    res.end("Hii");
  })
  .listen(PORT, () => {
    console.log(`server started ${pid}`);
  });
