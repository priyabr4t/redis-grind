import Redis from "ioredis"

const subscriber = new Redis(process.env.REDIS_URI || "https://localhost:6379")

subscriber.subscribe("notifications", (err) => {
    if (err) {
        console.log("failed to subscribe : %s", err.message)
        return
    }
    console.log("subscribed successfully")
})

subscriber.on("message", (channel, message) => {
    console.log("Received on : ")
})