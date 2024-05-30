import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const login = (req, res) => {
  const { username, password } = req.body;

  if (username !== 'user' || password !== 'user') {
    return res.status(400).json({ message: 'wrong username or password' });
  }

  const foundUser = {
    id: 123,
    username,
  };

  const accessToken = jwt.sign(
    {
      userId: foundUser.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: foundUser.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  res.status(201).json({ data: { accessToken } });
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundUserId = decoded.id;

      if (!foundUserId === '123')
        return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          userId: foundUserId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ data: { accessToken } });
    })
  );
};

export { login, refresh };
