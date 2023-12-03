import connectToDb from "@/database";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Joi from "joi";
import { hash } from "bcryptjs";

// Määrittele validointisääntöjä käyttäjän syötteille
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

// POST-metodi rekisteröintipyynnön käsittelyyn
export async function POST(req) {
  // Yhdistä tietokantaan
  await connectToDb();
  // Purkaa käyttäjän syöttämät tiedot pyynnöstä
  const { name, email, password, role } = await req.json();
  // Validoi syötetty data
  const { error } = schema.validate({ name, email, password, role });

   // Jos validoinnissa ilmenee virheitä, loggaa ne ja palauta virheviesti
  if (error) {
    console.log("error during registration",error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message
    });
  }
  try {
     // Yritä tarkistaa, onko käyttäjä jo olemassa ja luo uusi käyttäjä tarvittaessa
    const isUserAllreadyExists = await User.findOne({ email });
    if (isUserAllreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User allready exists. Please try with different Email",
      });
    } else {
      // Hashaa salasana ja luo uusi käyttäjä
      const hashPassword = await hash(password, 12);
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      console.log(newlyCreatedUser);
      console.log("  ...   ")
      // Jos käyttäjä luodaan onnistuneesti, palauta onnistumisviesti
      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account was created ",
        });
      }
    }
  } catch (error) {
    // Jos virheitä ilmenee, loggaa ne ja palauta palvelinvirheviesti
    //koodi menee tähän mutta tiedot tulevat mongodb oikein
    console.log("Error is located at new user registration");

    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
