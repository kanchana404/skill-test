// pages/api/protected-data.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    jwt.verify(token, 'your_secret_key'); // Replace with your secret key
    res.status(200).json({ message: 'Protected data' });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
