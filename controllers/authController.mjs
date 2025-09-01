import AuthService from "../services/authService.mjs";

export const register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error en registro:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Obtenemos email y contraseña del body
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error) {
    console.log('Error en login:', error);
    res.status(401).json({ message: error.message });
  }
};