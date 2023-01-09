const cluster = require("cluster");
const os = require("os");
const pid = process.pid;

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`CPUs: ${cpus}`);
  console.log(`Muster started! Process: ${pid}`);

  for (let i = 0; i < cpus - 1; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Wokrker died! Process: ${worker.process.pid}`);
    cluster.fork();
  });
}

if (cluster.isWorker) {
  console.log("Worker started!");
  require("./worker.js");

  process.on("message", (msg) => {
    console.log(`Hello from master: ${msg}`);
  });

  process.send(`Hiiiiiii ${process.pid}`);
}
