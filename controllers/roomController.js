import Room from "../models/Room.js";

// create new room
export const createRoom = async (req, res) => {
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedRoom,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// update room
export const updateRoom = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedRoom,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

// delete room
export const deleteRoom = async (req, res) => {
  const id = req.params.id;

  try {
    await Room.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

// getSingle room
export const getSingleRoom = async (req, res) => {
  const id = req.params.id;

  try {
    const room = await Room.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: room,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// getAll room
export const getAllRoom = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const rooms = await Room.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: rooms.length,
      message: "Successful",
      data: rooms,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get room by search
export const getRoomBySearch = async (req, res) => {
  // here 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than equal
    const rooms = await Room.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: rooms,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get featured room
export const getFeaturedRoom = async (req, res) => {
  try {
    const rooms = await Room.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: rooms,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get room counts
export const getRoomCount = async (req, res) => {
  try {
    const roomCount = await Room.estimatedDocumentCount();

    res.status(200).json({ success: true, data: roomCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
