import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret'

export function generateAccessToken(userId: number, role: string) {
  return jwt.sign({ userId, role }, ACCESS_SECRET, { expiresIn: '15m' })
}

export function generateRefreshToken(userId: number) {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET)
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET)
}