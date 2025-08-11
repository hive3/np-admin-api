import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Conservation extends Model {
  public id!: number;
  public description!: string;
}

Conservation.init(
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
    modelName: 'Conversation',
    tableName: 'conversation',
  }
);

export default Conservation;
