import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Opening extends Model {
  public id!: number;
  public description!: string;
}

Opening.init(
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
    modelName: 'Opening',
    tableName: 'openings',
  }
);

export default Opening;
