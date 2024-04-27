import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import Opening from './opening.model';
import StructuralSystem from './structural-system.model';
import WallCovering from './wall-covering.model';
import RoofCovering from './roof-covering.model';
import UseType from './use-type.model';
import CurrentState from './current-state.model';
import ConservationLevel from './conservation-level.model';
import ArchitectonicAdequacy from './architectonic-adequacy.model';
import FacadeTypology from './facade-typology.model';
import Intervention from './intervention.model';
import BuildingIntervention from './building-intervention.model';

class Building extends Model {
  public id!: number;
  public fid!: number;
  public buildingId!: string;
  public floors!: number;
}

Building.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    buildingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floors: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    indexes: [{ unique: true, fields: ['fid', 'buildingId'] }],
    modelName: 'Building',
    tableName: 'buildings',
  }
);

Opening.hasOne(Building, { sourceKey: 'id' });
StructuralSystem.hasOne(Building, { sourceKey: 'id' });
WallCovering.hasOne(Building, { sourceKey: 'id' });
RoofCovering.hasOne(Building, { sourceKey: 'id' });
UseType.hasOne(Building, { sourceKey: 'id' });
CurrentState.hasOne(Building, { sourceKey: 'id' });
ConservationLevel.hasOne(Building, { sourceKey: 'id' });
ArchitectonicAdequacy.hasOne(Building, { sourceKey: 'id' });
FacadeTypology.hasOne(Building, { sourceKey: 'id' });

Building.belongsTo(Opening);
Building.belongsTo(StructuralSystem);
Building.belongsTo(WallCovering);
Building.belongsTo(RoofCovering);
Building.belongsTo(UseType);
Building.belongsTo(CurrentState);
Building.belongsTo(ConservationLevel);
Building.belongsTo(ArchitectonicAdequacy);
Building.belongsTo(FacadeTypology);

Intervention.belongsToMany(Building, { through: BuildingIntervention, constraints: false, foreignKeyConstraint: false });
Building.belongsToMany(Intervention, { through: BuildingIntervention, sourceKey:'buildingId', foreignKey: 'BuildingId', onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: false,  constraints: false });
Intervention.hasMany(BuildingIntervention);
Building.hasMany(BuildingIntervention);
BuildingIntervention.belongsTo(Building);
BuildingIntervention.belongsTo(Intervention);

export default Building;
