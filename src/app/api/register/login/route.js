import connectToDb from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";
import {Jwt} from "jsonwebtoken";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const dynamic = "force-dynamic";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//validate login with schema and inform user if the password or email entered was incorrect
export async function POST(req) {
  await connectToDb();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  let user;
  try {
    user = await UserModel.findOne({ email });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found with this email",
    });
  }
  const checkPassword = await compare(password, user.password);
  if (!checkPassword) {
    return NextResponse.json({
      success: false,
      message: "Invalid Password",
    });
  }
  //create token and use it in final data which gets sent to front-end
  const token = Jwt.sign(
    {
      id: user._id,
      email: user?.email,
      role: user?.role,
    },
    "default_secret_key",
    { expiresIn: "1d" }
  );

  const finalData = {
    token,
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
      role: user.role,
    },
  };
  return NextResponse.json({
    success: true,
    message: "login succesfull",
    data: finalData,
  });
}
