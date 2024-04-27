
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class ArchitectonicAdequacy extends Model {
  public id!: number;
  public description!: string;
}

ArchitectonicAdequacy.init(
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
    modelName: 'ArchitectonicAdequacy',
    tableName: 'architectonic_adequacy',
  }
);

export default ArchitectonicAdequacy;
