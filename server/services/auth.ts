import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

if (!secret) {
  console.error('Secret key is not defined in the environment variables.');
  process.exit(1); // Handle the absence of secret key as needed
}

export const createToken = (user: any) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  if (secret) {
    const token = jwt.sign(payload, secret);
    return token; // Return the token so it can be used elsewhere in your application
  } else {
    console.error('Secret key is undefined.');
    return null; // Handle the absence of secret key as needed
  }
};

export const validateToken = (token: string) => {
  try {
    if (secret) {
      const payload = jwt.verify(token, secret);
      return payload;
    } else {
      console.error('Secret key is undefined.');
      return null; // Handle the absence of secret key as needed
    }
  } catch (error) {
    return null; // You might want to handle this error differently based on your application's requirements
  }
};
