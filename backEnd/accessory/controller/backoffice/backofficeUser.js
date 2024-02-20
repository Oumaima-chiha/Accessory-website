const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const { backOfficeUser } = require('../../models');
const jwt = require('jsonwebtoken');



// Function for signing up a back office user

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function generateAccessToken(user) {
  const formattedRole = {
    ...user.role,
    permissions: []
  };
  return jwt.sign({ sub: user.id, email: user.email,role:formattedRole }, process.env.JWT_BO_USER_ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' });
}

function generateRefreshToken(user) {
  const formattedRole = {
    ...user.role,
    permissions: user.role.permissions.map(p=>p.permission)
  };
  return jwt.sign({ id: user.id, email: user.email,role: formattedRole }, process.env.JWT_BO_USER_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });
}

async function updateRefreshToken(userId, refreshToken) {
  const hash = await hashPassword(refreshToken);
  await backOfficeUser.update({data:{
    refreshToken: hash
  },
    where: {
      id: userId
    }
  });
}

function generateAuthResponse(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
}

async function createUser(createBoUserDto) {
  await backOfficeUser.create({
    data: {
      ...createBoUserDto,
      password: hashPassword(createBoUserDto.password),
    },
  });
}
async function signup(req, res, next) {
  try {
    await createUser(req.body);
    res.sendStatus(HttpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    const user = await backOfficeUser.findUnique({
      where: { username },
      include: { role: { include: { permissions: { include: { permission: true } } } } },
    });

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid password' });
    }
      const authResponse = generateAuthResponse(user);
      await updateRefreshToken(user.id, authResponse.refreshToken);
      res.json(authResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}




// Function to handle the refresh token
async function refreshTokens(req, res) {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Refresh token not provided' });
    }

    const user = await backOfficeUser.findUnique({ where: { refreshToken } });
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid refresh token' });
    }

    const token = generateAccessToken(user);
    res.json({ accessToken: token });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}
// Error handling middleware


module.exports = {
  signup,
  signIn,
  refreshTokens,
};
