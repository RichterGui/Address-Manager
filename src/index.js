import os from 'os';
import cluster from 'cluster';

async function runPrimaryProcess() {
  const cpus = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server with ${cpus} threads`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      cluster.fork();
    }
  });
}

async function runWorkerProcess() {
  await import('./server.js');
}
cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
