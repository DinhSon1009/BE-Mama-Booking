import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getFeaturedRoom,
  getSingleRoom,
  getRoomBySearch,
  getRoomCount,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new room
router.post("/", verifyAdmin, createRoom);

// update  room
router.put("/:id", verifyAdmin, updateRoom);

// delete room
router.delete("/:id", verifyAdmin, deleteRoom);

// get single room
router.get("/:id", getSingleRoom);

// get all room
router.get("/", getAllRoom);

// get room by search
router.get("/search/getRoomBySearch", getRoomBySearch);
router.get("/search/getFeaturedRooms", getFeaturedRoom);
router.get("/search/getRoomCount", getRoomCount);

export default router;
