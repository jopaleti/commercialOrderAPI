import express, { Request, Response, NextFunction } from "express";
import {
	CreateVandor,
	deleteAll,
	GetVandorById,
	GetVandors,
} from "../controllers";

const router = express.Router();

// create vandor
router.post("/vandor", CreateVandor);
router.delete("/vandor", deleteAll);
router.get("/vandors", GetVandors);
router.get("/vandor/:id", GetVandorById);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: "Hello from admin" });
});

export { router as AdminRoute };
