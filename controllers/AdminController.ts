import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GenerateSalt, GeneratePassword } from "../utility";

export const FindVandor = async (id: string | undefined, email?: string) => {
	if (email) {
		return await Vandor.findOne({ email: email });
	} else {
		return await Vandor.findById(id);
	}
};

export const CreateVandor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		name,
		address,
		pincode,
		foodType,
		email,
		password,
		ownerName,
		phone,
	} = <CreateVandorInput>req.body;

	const existingVandor = await FindVandor("", email);

	if (existingVandor !== null) {
		return res.json({ message: "A vendor already exists" });
	}

	// Generate salt
	const salt = await GenerateSalt();
	// Encrypt the password using the salt
	const userPassword = await GeneratePassword(password, salt);

	const createVandor = await Vandor.create({
		name: name,
		address: address,
		pincode: pincode,
		foodType: foodType,
		email: email,
		password: userPassword,
		salt: salt,
		ownerName: ownerName,
		phone: phone,
		rating: 0,
		serviceAvailable: false,
		coverImages: [],
	});

	res.status(200).json(createVandor);
};

export const GetVandors = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const vandors = await Vandor.find();
	if (vandors !== null) {
		return res.status(200).json(vandors);
	}
	return res.json("Vandors Not available!");
};

export const GetVandorById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const vandorId = await req.params.id;
	const vandor = await FindVandor(vandorId);
	if (vandorId !== null) {
		return res.json(vandor);
	}
	return res.json({ message: "No vandor found" });
};
// Note: This functions is not Needed for now
export const deleteAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getAll = await Vandor.find();
	if (getAll !== null) {
		await Vandor.deleteMany().then((result) => {
			return res.json({ message: "Successfully deleted all vandors" });
		});
	}
	return res.json("No vandors found");
};
