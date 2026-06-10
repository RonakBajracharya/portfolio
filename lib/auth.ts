import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2b$10$7JsPbh5Rv6K.EyFWvVpcSO5dwEoMR01bOgelxRr.ZU3fgxeBdmVhi"
const ADMIN_SECRET = process.env.ADMIN_SECRET || "00999c8ee4e5bec7e0a4794b6d6080a9d8a367bb6f2d8896501a948971117fec"
const COOKIE_NAME = "admin_token"

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)
  return token?.value === ADMIN_SECRET
}

export async function login(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false
  const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  if (!match) return false
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  })
  return true
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })
}

export async function requireAuth(): Promise<{ authorized: boolean; error?: string }> {
  if (await isAuthenticated()) {
    return { authorized: true }
  }
  return { authorized: false, error: "Unauthorized" }
}