import express from "express";
import UserRepositoryMongoDB from "../db/user.mongo";
import UserRepository from "../../domain/User.repository";

const router = express.Router();
const userRepository: UserRepository = new UserRepositoryMongoDB();

router.get("/", async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userRepository.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const createdUser = await userRepository.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
