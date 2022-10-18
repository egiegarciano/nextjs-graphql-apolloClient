import { verify } from 'jsonwebtoken'

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
const decodeToken = (token: string) => {
  try {
    const decode: any = verify(token, 'hide-me')
    return decode
  } catch (error) {
    return undefined
  }
}

export default decodeToken
