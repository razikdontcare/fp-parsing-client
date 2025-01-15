import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface History {
  accepted: boolean;
  text: string;
}

export default async function getHistory(): Promise<History[]> {
  const ref = collection(db, "history");
  const q = query(ref, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const history = querySnapshot.docs.map((doc) => doc.data());
  return history as History[];
}
