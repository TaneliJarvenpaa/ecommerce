import connectToDb from "@/database";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Joi from "joi";
import { hash } from "bcryptjs";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDb();
  const { name, email, password, role } = await req.json();
  //validate schema
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    console.log("error during registration",error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message
    });
  }
  try {
    //check if user exists allready, if it doesnt creates a new account
    const isUserAllreadyExists = await User.findOne({ email });
    if (isUserAllreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User allready exists. Please try with different Email",
      });
    } else {
      const hashPassword = await hash(password, 12);
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account was created ",
        });
      }
    }
  } catch (error) {
    console.log("Error is located at new user registration");

    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
