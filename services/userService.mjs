import { UserModel } from "../models/userModel.mjs";

class UserService {
  
  // Método para obtener todos los usuarios
  async getUsers () {
    const response = await UserModel.find().populate('role');

    return response;
  }

  // Método para obtener un usuario particular
  async getUserId (_id) {
    const response = await UserModel.findById(_id).populate('role');
    
    return response;
  }

  // Método para eliminar un usuario
  async deleteUser (_id) {
    await UserModel.findByIdAndDelete(_id);

    return { status: 200, message: 'Usuario eliminado con éxito' };
  }
}

export default new UserService;