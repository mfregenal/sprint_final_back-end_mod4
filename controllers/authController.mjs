import AuthService from "../services/authService.mjs";
import userService from "../services/userService.mjs";

export const register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 2 * 60 * 60 * 1000
    });

    res.status(200).json(result.user);
  } catch (error) {
    console.log('Error en registro:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body; // Obtenemos email y contraseña del body
    const result = await AuthService.login(username, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 2 * 60 * 60 * 1000
    });

    res.json(result.user);
  } catch (error) {
    console.log('Error en login:', error);
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.json( { message: 'Logout exitoso' });
}

export const check = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.json({ loggedIn: false });

  try {
    const response = await AuthService.check(token);
    const user = await userService.getUserId(response.id);

    res.json({ loggedIn: true, user: user });
  } catch (error) {
    res.json({ loggedIn: false });
    console.log(error);
  }
}