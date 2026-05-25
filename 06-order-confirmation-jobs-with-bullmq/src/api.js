import express from "express"
import { emailQueue } from "./queue.js"

const app = express()
app.use(express.json())

app.use("/welcome-email", async (req, res) => {
    const job = emailQueue.add("send-welcome-email",
        {
            to: req.body.to,
            name: req.body.name || "Leaner"
        },
        {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000,

            }
        },
    )
    res.json({ messages: "welcome email job added to queue", jobId: job.id })
})

app.listen(3000, () => {
    console.log("server is runnin at port : 3000")
})












app.listen(3000, () => {
    console.log('Server started at port : 3000')
})