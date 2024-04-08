import express from "express";
import { update, deleteUser, getUser, like, dislike, watch, trackStatus, checkStatus } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update a user
router.put("/:id", verifyToken, update)

//delete a user
router.delete("/:id", verifyToken, deleteUser)

//get a user
router.get("/find", verifyToken, getUser)

//like a video
router.post("/like", verifyToken, like)

//dislike a video
router.post("/dislike", verifyToken, dislike);

router.post("/watch", verifyToken, watch)

router.get("/track/:id", verifyToken, trackStatus);

router.get("/status/:id", verifyToken, checkStatus);

router.put("/dislike/:videoId", verifyToken, dislike);

export default router;