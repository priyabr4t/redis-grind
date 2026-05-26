import Redis from "ioredis"
import express from "express"

const app = express()
app.use(express.json())

const redis = new Redis(process.env.REDIS_URI || "redis://localhost:6379")

// Increment view count for a post
app.post("/post/:id/view", async (req, res) => {

    try {

        const postId = req.params.id
        const views = await redis.incr(`post:${postId}:views`)

        res.json({
            success: true,
            postId,
            views
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

// Add points to a user's leaderboard score
app.post("/leaderboard/score", async (req, res) => {
    const { userId, points } = req.body

    await redis.zIncrBy(
        "leaderboard:global",
        points,
        userId
    )

    res.json({
        success: true
    })
})

// Get top 10 leaderboard entries (member and score)
app.get("/leaderboard", async (req, res) => {

    const leaders = await redis.zRange(
        "leaderboard:global",
        0,
        9,
        {
            REV: true,
            WITHSCORES: true
        }
    )

    res.json(leaders)
})

// Get 1-based rank for a specific user
app.get("/leaderboard/:userId/rank", async (req, res) => {

    const rank = await redis.zRevRank(
        "leaderboard:global",
        req.params.userId
    )

    res.json({
        rank: rank + 1
    })
})
