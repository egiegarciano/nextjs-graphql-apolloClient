import { verify } from 'jsonwebtoken'
import { jwtVerify } from 'jose'

export type accessTokenType = {
  exp: number
  iat: number
  sub: number
  username: string
}

/**
 * A function that will decode the content associated in the token.
 *
 * @returns This will return the email/role associated on the token.
 */
export const decodeToken = (token: string) => {
  try {
    return verify(token, 'hide-me') as any
  } catch (error) {
    console.log('error when decoding token', error)
  }
}

export const joseJwtVerify = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode('hide-me')
    )
    return payload
  } catch (error) {
    console.log('error when decoding token using jose', error)
  }
}
