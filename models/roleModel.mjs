import mongoose from 'mongoose';

const roleModelsSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
  }
);

export const RoleModel = mongoose.model('Role', roleModelsSchema);