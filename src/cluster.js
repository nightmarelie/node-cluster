const cluster = require("cluster");
const os = require("os");
const pid = process.pid;

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`CPUs: ${cpus}`);
  console.log(`Muster started! Process: ${pid}`);

  for (let i = 0; i < cpus - 1; i++) {
    const worker = workerResurrection(cluster);
    worker.send(`Hello ${worker.process.pid}`);
    worker.on("message", (msg) => {
      console.log(`Hello from worker: ${msg}`);
    });
  }
}

if (cluster.isWorker) {
  console.log("Worker started!");
  require("./worker.js");

  process.on("message", (msg) => {
    console.log(`Hello from master: ${msg}`);
  });

  process.send(`Hiiiiiii ${process.pid}`);
}

function workerResurrection(cluster) {
  const worker = cluster.fork();

  worker.on("exit", () => {
    console.log(`Worker died! Process: ${worker.process.pid}`);
    workerResurrection(cluster);
  });

  return worker;
}
