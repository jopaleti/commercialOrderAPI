import express, { Request, Response, NextFunction } from "express";
import {
	GetVandorProfile,
	UpdateVandorProfile,
	UpdateVandorService,
	VandorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

// Login routes
router.post("/login", VandorLogin);

router.get("/profile", Authenticate, GetVandorProfile);
router.patch("/profile", UpdateVandorProfile);
router.patch("/service", UpdateVandorService);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: "Hello from vandor" });
});

export { router as VandorRoute };
