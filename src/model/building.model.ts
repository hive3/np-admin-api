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
  public isCulturalHeritage!: boolean;
  public isCulturallySignificantArea!: boolean;
  public Opening!: Opening;
  public StructuralSystem!: StructuralSystem;
  public WallCovering!: WallCovering;
  public RoofCovering!: RoofCovering;
  public UseType!: UseType;
  public CurrentState!: CurrentState;
  public ConservationLevel!: ConservationLevel;
  public ArchitectonicAdequacy!: ArchitectonicAdequacy;
  public FacadeTypology!: FacadeTypology;
  public Interventions!: Intervention[];
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
    isCulturalHeritage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isCulturallySignificantArea: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: 'building',
  }
);

Building.belongsTo(Opening);
Building.belongsTo(StructuralSystem);
Building.belongsTo(WallCovering);
Building.belongsTo(RoofCovering);
Building.belongsTo(UseType);
Building.belongsTo(CurrentState);
Building.belongsTo(ConservationLevel);
Building.belongsTo(ArchitectonicAdequacy);
Building.belongsTo(FacadeTypology);

Intervention.belongsToMany(Building, {
  through: BuildingIntervention,
  constraints: false,
  foreignKeyConstraint: false,
});

Building.belongsToMany(Intervention, {
  through: BuildingIntervention,
  sourceKey: 'id',
  foreignKey: 'BuildingId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  hooks: true,
  foreignKeyConstraint: false,
  constraints: false,
});

Intervention.hasOne(BuildingIntervention);
BuildingIntervention.belongsTo(Building);
BuildingIntervention.belongsTo(Intervention);

export default Building;
