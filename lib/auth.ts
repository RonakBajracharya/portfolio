import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2b$10$7JsPbh5Rv6K.EyFWvVpcSO5dwEoMR01bOgelxRr.ZU3fgxeBdmVhi"
const COOKIE_NAME = "admin_token"

function getAuthToken(): string {
  return ADMIN_PASSWORD_HASH + "_session"
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)
  return token?.value === getAuthToken()
}

export async function login(password: string): Promise<boolean> {
  const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  if (match) {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, getAuthToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })
    return true
  }
  return false
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