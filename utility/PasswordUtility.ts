import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { VandorPayload } from "../dto";
import { AuthPayload } from "../dto/Auth.dto";
// import { Request } from "express";

export const GenerateSalt = async () => {
	return bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
	return bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
	enteredPassword: string,
	savedPassword: string,
	salt: string
) => {
	return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = (payload: VandorPayload) => {
	return jwt.sign(payload, APP_SECRET, { expiresIn: "3d" });
};

export const ValidateSignature = async (req: any) => {
	// Check for the validation of the Token
	const signature = req.header("Authorization");
	if (signature) {
		const payload = (await jwt.verify(
			signature.split(" ")[1],
			APP_SECRET
		)) as AuthPayload;
		req.user = payload;
		return true;
	}
	return false;
};
