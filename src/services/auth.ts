// services/auth.ts
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function loginAdmin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // console.error("Login error:", error);
    throw new Error(error.message);
  }
}

export async function logoutAdmin() {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error);
  }
}
