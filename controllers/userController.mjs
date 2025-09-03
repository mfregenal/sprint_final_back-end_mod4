import UserService from "../services/userService.mjs";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {

  try {
    const response = await UserService.getUsers();

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
    console.log("userController - L13: ", error);
  }
}

// Obtener un usuario en especifico
export const getUserId = async (req, res) => {
  const _id = req.params.id;

  try {
    const response = await UserService.getUserId(_id);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
    console.log("userController - L25: ", error);
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const response = await UserService.deleteUser(_id);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
    console.log("userController - L40: ", error);
  }
}