import connectToDb from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";
import {Jwt} from "jsonwebtoken";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

//väkisin määritetty dynaaminen reitti
export const dynamic = "force-dynamic";
// Määritä skeema käyttäjän sähköpostin ja salasanan validointiin
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// POST-funktio käsittelee kirjautumispyyntöjä
export async function POST(req) {
  await connectToDb();
 // Purkaa pyynnöstä sähköpostin ja salasanan
  const { email, password } = await req.json();
// Validoi sähköposti ja salasana
  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
   // Alustetaan käyttäjämuuttuja
  let user;
  try {
    // Etsi käyttäjä sähköpostin perusteella
    user = await UserModel.findOne({ email });
  } catch (err) {
    // Jos tietokantahaku epäonnistuu, palauta virheviesti
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
  // Jos käyttäjää ei löydy, palauta virheviesti
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found with this email",
    });
  }
   // Vertaa salasanaa tietokannassa olevaan salasanaan
  const checkPassword = await compare(password, user.password);
  if (!checkPassword) {
    return NextResponse.json({
      success: false,
      message: "Invalid Password",
    });
  }
  // Luo JWT-token
  const token = Jwt.sign(
    {
      id: user._id,
      email: user?.email,
      role: user?.role,
    },
    "default_secret_key",
    { expiresIn: "1d" }
  );
// Muodosta lopulliset käyttäjätiedot
  const finalData = {
    token,
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
      role: user.role,
    },
  };
  // Palauta onnistumisviesti ja käyttäjätiedot
  return NextResponse.json({
    success: true,
    message: "login succesfull",
    data: finalData,
  });
}
