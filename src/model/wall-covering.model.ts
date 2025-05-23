import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class WallCovering extends Model {
  public id!: number;
  public description!: string;
}

WallCovering.init(
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
    modelName: 'WallCovering',
    tableName: 'wall_covering',
  }
);

export default WallCovering;
