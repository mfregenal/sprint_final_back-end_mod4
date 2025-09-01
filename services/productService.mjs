import { ProductModel } from '../models/productModel.mjs';

class ProductService {

  // Método para obtener todos los productos
  async getProducts (query) {
    let filtro

    // Construimos el filtro con $and dinámico
    if ( query ) {
      filtro = {
        $and: Object.entries(query).map( ( [key, value] ) => ({
          [key]: { $regex: value, $options: 'i' }
        }))
      };
    }

    return await ProductModel.find(filtro);
  }

  // Método para agregar nuevos productos
  async addProduct (nombre, precio, categoria, imagen) {

    const existeProducto = await ProductModel.findOne({ nombre });

    if ( existeProducto ) {
      await deleteImage(imagen);
      return { status: 409, message: 'Ya existe un producto con ese nombre' }
    }

    const newProduct = new ProductModel({
      nombre,
      precio,
      categoria,
      imagen
    });

    await newProduct.save();

    return { status: 200, message: 'Producto creado exitosamente' }

  }

  // Método para editar un producto
  async editProduct (_id, nombre, precio, categoria, imagen) {

    const prevProduct = await ProductModel.findById(_id);
    const existeProducto = await ProductModel.findOne({ nombre });

    // Verificamos que no exista un producto con el mismo nombre
    if ( existeProducto ) {
      if ( imagen ){
        await deleteImage(imagen);
      }
      return { status: 409, message: 'Ya existe un producto con ese nombre' }
    }

    // Cargamos la imagen al producto si no se edito o se borrar la anterior en caso de que si
    if ( !imagen ){
      imagen = prevProduct.imagen;
    } else {
      await deleteImage(prevProduct.imagen);
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      { nombre, precio, categoria, imagen }
    );

    if ( !updatedProduct ) {
      return { status: 404, message: 'Producto no encontrado' };
    }

    return { status: 200, message: 'Producto actualizado exitosamente' }
  }

  // Método para eliminar un producto
  async deleteProduct (_id) {
    const deleted = await ProductModel.findByIdAndDelete(_id); // Eliminamos el elemento y lo guardamos lo devuelto

    if ( !deleted ) { // Corroboramos que al eliminar el elemento no haya sucedido un error
      return { status: 404, message: 'Producto no encontrado' };
    }

    await deleteImage(deleted.imagen);

    return { status: 200, message: 'Producto eliminado correctamente' };
  }
  
}

const deleteImage = async (filename) => {
  if (!filename) return;

  const ruta = path.join(process.cwd(), 'uploads', filename); // Conseguimos la ruta del archivo desde el directorio actual que corre index.mjs
  try {
    await fs.unlink(ruta); // Eliminamos el archivo indicado en la ruta
  } catch (error) {
    console.log('No se pudo eliminar la imagen:', error.message);
    throw new Error('Error interno detectado. Contacta a soporte para más información.');
  }
};

export default new ProductService;








