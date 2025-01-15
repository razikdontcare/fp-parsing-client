import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import type { Data } from "../routes/parser";

export default async function saveHistory(data: Data) {
  try {
    const ref = collection(db, "history");
    await addDoc(ref, {
      accepted: data.accepted,
      text: data.text,
      createdAt: new Date(),
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(error.message);
    }
  }
}
