import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";
import { env } from "@/lib/env";

type AppSession = { userId?: string; role?: "ADMIN" | "CUSTOMER" };

const options: SessionOptions = {
  password: env.SESSION_SECRET,
  cookieName: "mt_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" }
};

export async function getSession() {
  return getIronSession<AppSession>(cookies(), options);
}
