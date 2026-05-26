import express from "express"
import Redis from "ioredis"

const app = express()
app.use(express.json())

const publisher = new Redis(process.env.REDIS_URI || "redis://http:localhost:6379")

app.post("/notifications", async (req, res) => {
    const payload = {
        title: req.body.title || "default title",
        createdAt: new Date().toISOString()
    },
    const receivers = await publisher.publish("notifications", JSON.stringify(payload))

    res.json({ message: `notification sent to &{receivers} subscribers` })
})
app.listen(3000, () => {
    console.log("Server is running at port: 3000")
})