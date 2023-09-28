import { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVandor } from "./AdminController";

export const VandorLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = <VandorLoginInputs>req.body;

	const existingVandor = await FindVandor("", email);

	if (existingVandor !== null) {
		// Validaton
		const Validation = await ValidatePassword(
			password,
			existingVandor.password,
			existingVandor.salt
		);

		if (Validation) {
			// Assign a signature (TOKEN for validation)
			const signature = GenerateSignature({
				_id: existingVandor.id,
				email: existingVandor.email,
				foodTypes: existingVandor.foodType,
				name: existingVandor.name,
			});
			return res.json(signature);
		} else {
			return res.json({ message: "Password is not valid" });
		}
	}
	return res.json({ message: "Invalid Login Credentials" });
};

export const GetVandorProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user;
	if(user) {
		const existingVandor = await FindVandor(user._id);
		return res.json(existingVandor);
	}
	return res.json({ message: "Vandor Information Not Found" });
};

export const UpdateVandorProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const UpdateVandorService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
