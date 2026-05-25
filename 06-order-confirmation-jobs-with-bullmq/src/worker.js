import { Worker } from "bullmq";
import { connection } from "./queue.js"

const worker = new Worker(
    "emails",
    async (jobs) => {
        console.log("Processing email ...", jobs.id, jobs.name, jobs.data)
        // add delay here
        await new Promise((resolve) => setTimeout(resolve, 1500)),
            console.log("Process completed ... ", jobs.id, jobs.name, jobs.data)
    },
    {
        connection
    }
)

worker.on("completed", (job) => {
    console.log("Job completed", job.id, job.name, job.data)
})

worker.on("failed", (job, err) => {
    console.log("Job failed", job.id, job.name, job.data, err)
})