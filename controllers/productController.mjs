import ProductService from "../services/productService.mjs";


// Obtener todos los productos o productos específicos
export const getProducts = async (req, res) => {
  const query = req.query;

  try {
    const response = await ProductService.getProducts(query);

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
    console.log("productController - L13: ", error);
  }
}

// Agregar nuevo producto
export const addProduct = async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;
    const imagen = req.file?.filename;

    const response = await ProductService.addProduct(nombre, precio, categoria, imagen)

    res.status(response.status).json( response.message );
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar nuevo producto' });
    console.log("productController - L29: ", error);
  }
}

// Editar un producto
export const editProduct = async (req, res) => {
  const { _id, nombre, precio, categoria } = req.body;

  let imagen = req.file?.filename;

  try {
    const response = await ProductService.editProduct(_id, nombre, precio, categoria, imagen);

    res.status(response.status).json( response.message );
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto' });
    console.log("productController - L44: ", error);
  }
}

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params; //Obtenemos el id del elemento a eliminar desde los parámetros

    const response = await ProductService.deleteProduct(_id);

    res.status(response.status).json( response.message );
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
    console.log("productController - L57: ", error);
  }
}