import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI no definido en las variables de entorno.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      // opciones por compatibilidad si se requieren en versiones antiguas
    } as mongoose.ConnectOptions);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
