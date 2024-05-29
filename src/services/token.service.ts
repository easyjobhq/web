import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

interface DecodedToken {
  id: string; // Ajusta esto según los datos que tengas en el token
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req.headers;

  if (!cookies) {
    return res.status(401).json({ message: 'No cookies provided' });
  }

  const parsedCookies = cookie.parse(cookies as string);
  const token = parsedCookies.token; // Asegúrate de que la clave coincida con la clave que usaste para almacenar el token

  if (!token) {
    return res.status(401).json({ message: 'No token found in cookies' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const userId = decoded.id; // Asegúrate de que 'userId' esté en el payload del token

    return res.status(200).json({ userId });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
