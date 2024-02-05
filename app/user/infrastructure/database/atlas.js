import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config("../");

export async function con() {
  try {
    const uri = `${process.env.ATLAS_STRCONNECT}`;
    const client = await MongoClient.connect(uri);
    return client.db();
  } catch (error) {
    return { status: 500, message: error.message };
  }
}