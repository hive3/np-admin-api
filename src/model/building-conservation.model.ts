import { Model } from 'sequelize';
import sequelize from '../config/sequelize';

class BuildingConservation extends Model {
  ConservationId!: number;
  BuildingId!: number;
}

BuildingConservation.init(
  {},
  {
    sequelize,
    modelName: 'BuildingConservation',
    tableName: 'building_conservation',
  }
);

export default BuildingConservation;
