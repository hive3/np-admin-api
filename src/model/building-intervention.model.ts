import { Model } from 'sequelize';
import sequelize from '../config/sequelize';

class BuildingIntervention extends Model {
  InterventionId!: number;
  BuildingId!: number;
}

BuildingIntervention.init(
  {},
  {
    sequelize,
    modelName: 'BuildingIntervention',
    tableName: 'building_intervention',
  }
);

export default BuildingIntervention;
