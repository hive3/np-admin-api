import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class StructuralSystem extends Model {
  public id!: number;
  public description!: string;
}

StructuralSystem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'StructuralSystem',
    tableName: 'structural_systems',
  }
);

export default StructuralSystem;
