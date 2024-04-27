import { Model } from 'sequelize';
import sequelize from '../config/sequelize';

class BuildingIntervention extends Model {
  InterventionId!: number;
  BuildingId!: string;
}

BuildingIntervention.init(
  {},
  {
    sequelize,
    modelName: 'BuildingIntervention',
    tableName: 'building_interventions',
  }
);

export default BuildingIntervention;
