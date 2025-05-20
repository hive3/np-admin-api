-- architectonic_adequacy definition

CREATE TABLE `architectonic_adequacy` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- conservation_level definition

CREATE TABLE `conservation_level` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- current_state definition

CREATE TABLE `current_state` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- facade_typology definition

CREATE TABLE `facade_typology` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- interventions definition

CREATE TABLE `interventions` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- openings definition

CREATE TABLE `openings` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- roof_coverings definition

CREATE TABLE `roof_coverings` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- structural_systems definition

CREATE TABLE `structural_systems` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- use_type definition

CREATE TABLE `use_type` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- wall_coverings definition

CREATE TABLE `wall_coverings` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));


-- buildings definition

CREATE TABLE `buildings` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `fid` INTEGER, `buildingId` VARCHAR(255) NOT NULL, `floors` INTEGER, `OpeningId` INTEGER REFERENCES `openings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `StructuralSystemId` INTEGER REFERENCES `structural_systems` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `WallCoveringId` INTEGER REFERENCES `wall_coverings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `RoofCoveringId` INTEGER REFERENCES `roof_coverings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `UseTypeId` INTEGER REFERENCES `use_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `CurrentStateId` INTEGER REFERENCES `current_state` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `ConservationLevelId` INTEGER REFERENCES `conservation_level` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `ArchitectonicAdequacyId` INTEGER REFERENCES `architectonic_adequacy` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `FacadeTypologyId` INTEGER REFERENCES `facade_typology` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')));

CREATE UNIQUE INDEX `buildings_building_id` ON `buildings` (`buildingId`);
CREATE UNIQUE INDEX `buildings_fid` ON `buildings` (`fid`);


-- building_interventions definition

CREATE TABLE `building_interventions` (`createdAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `updatedAt` DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime')), `InterventionId` INTEGER NOT NULL REFERENCES `interventions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `BuildingId` VARCHAR NOT NULL REFERENCES `buildings` (`buildingId`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE UNIQUE INDEX `buildings_interventions_buildingid_fid` ON `building_interventions` (`BuildingId`, `InterventionId` );


INSERT INTO facade_typology(id,description) VALUES (1,'a. 2-story house');
INSERT INTO facade_typology(id,description) VALUES (2,'b. 2-story house with projecting staircase');
INSERT INTO facade_typology(id,description) VALUES (3,'c. 2-story house with projecting staircase and porch');
INSERT INTO facade_typology(id,description) VALUES (4,'d. Typical house');
INSERT INTO facade_typology(id,description) VALUES (5,'f. Projecting balcony with staircase');
INSERT INTO facade_typology(id,description) VALUES (6,'g. Recessed balcony');
INSERT INTO facade_typology(id,description) VALUES (7,'n. Not identified');

INSERT INTO architectonic_adequacy(id,description) VALUES (1,'New Building/Imitation Vernacular');
INSERT INTO architectonic_adequacy(id,description) VALUES (2,'New Building/Not Vernacular');
INSERT INTO architectonic_adequacy(id,description) VALUES (3,'Traditional (from other regions)');
INSERT INTO architectonic_adequacy(id,description) VALUES (4,'Vernacular Building');
INSERT INTO architectonic_adequacy(id,description) VALUES (5,'Vernacular with Dissonances');
INSERT INTO architectonic_adequacy(id,description) VALUES (6,'Vernacular without Dissonances');

INSERT INTO conservation_level(id,description) VALUES (1,'Excellent (100-75%)');
INSERT INTO conservation_level(id,description) VALUES (2,'Good (75-50%)');
INSERT INTO conservation_level(id,description) VALUES (3,'Medium (50-25%)');
INSERT INTO conservation_level(id,description) VALUES (4,'Bad (<25%-Ruin)');

INSERT INTO current_state(id,description) VALUES (1,'Abandoned');
INSERT INTO current_state(id,description) VALUES (2,'In Rehabilitation/Construction');
INSERT INTO current_state(id,description) VALUES (3,'In Use');

INSERT INTO use_type(id,description) VALUES (1,'Community');
INSERT INTO use_type(id,description) VALUES (2,'Residential');
INSERT INTO use_type(id,description) VALUES (3,'Storage');

INSERT INTO roof_coverings(id,description) VALUES (1,'Ceramic');
INSERT INTO roof_coverings(id,description) VALUES (2,'Mixed');
INSERT INTO roof_coverings(id,description) VALUES (3,'Modern');
INSERT INTO roof_coverings(id,description) VALUES (4,'Slate');
INSERT INTO roof_coverings(id,description) VALUES (5,'Uncertain');

INSERT INTO wall_coverings(id,description) VALUES (1,'Cement/Uncertain plaster');
INSERT INTO wall_coverings(id,description) VALUES (2,'Granite');
INSERT INTO wall_coverings(id,description) VALUES (3,'Lime/Earth Plaster');
INSERT INTO wall_coverings(id,description) VALUES (4,'Mixed Traditional');
INSERT INTO wall_coverings(id,description) VALUES (5,'Modern and Traditional');
INSERT INTO wall_coverings(id,description) VALUES (6,'Modern Materials');

INSERT INTO openings(id,description) VALUES (1,'Mixed');
INSERT INTO openings(id,description) VALUES (2,'Modern Materials');
INSERT INTO openings(id,description) VALUES (3,'Traditional');
INSERT INTO openings(id,description) VALUES (4,'Voids');

INSERT INTO structural_systems(id,description) VALUES (1,'Concrete');
INSERT INTO structural_systems(id,description) VALUES (2,'Modern and Traditional');
INSERT INTO structural_systems(id,description) VALUES (3,'Traditional Masonry');

INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1845,'PN_Z01_001',3,1,3,4,1,1,3,1,3,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1859,'PN_Z01_002',3,2,1,2,2,2,3,2,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1860,'PN_Z01_003',2,2,2,2,1,2,3,1,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1861,'PN_Z01_004',3,2,3,2,2,3,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1862,'PN_Z01_005',3,2,4,2,4,2,1,4,4,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1863,'PN_Z01_006',3,2,4,2,4,2,1,4,4,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1864,'PN_Z01_007',3,2,4,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1865,'PN_Z01_008',2,2,2,5,1,2,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1866,'PN_Z01_009',2,2,2,1,1,2,3,2,5,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1867,'PN_Z01_010',3,1,3,2,4,3,3,1,6,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1868,'PN_Z01_011',3,1,3,2,4,3,3,2,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1869,'PN_Z01_012',2,2,2,5,4,2,3,1,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1870,'PN_Z01_013',2,2,2,5,1,2,3,1,3,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1871,'PN_Z01_014',3,2,3,2,4,2,1,2,4,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1872,'PN_Z01_015',3,2,3,2,4,2,3,2,3,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1873,'PN_Z01_016',3,2,3,2,2,2,3,1,3,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1874,'PN_Z01_017',2,2,2,2,1,2,3,2,5,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1875,'PN_Z01_018',2,2,2,2,1,2,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1876,'PN_Z01_019',3,2,1,2,3,2,3,2,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1877,'PN_Z01_020',3,2,4,2,2,2,1,2,5,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1878,'PN_Z01_021',2,2,2,5,2,2,3,2,5,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1879,'PN_Z01_022',2,2,1,2,2,2,3,2,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1884,'PN_Z01_023',3,2,3,5,2,2,3,3,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1881,'PN_Z01_024',3,2,2,2,2,2,3,2,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1882,'PN_Z01_025',2,1,3,2,4,3,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1883,'PN_Z01_026',2,2,2,5,1,2,3,2,3,5);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1885,'PN_Z01_027',2,2,2,2,2,2,3,1,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1880,'PN_Z01_028',3,2,4,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1886,'PN_Z01_029',2,2,2,5,1,2,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1892,'PN_Z01_030',2,2,2,2,2,2,3,1,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1893,'PN_Z01_031',3,1,3,2,4,3,3,2,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1894,'PN_Z01_032',2,2,2,5,3,2,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1891,'PN_Z01_033',2,1,3,5,1,3,3,3,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1890,'PN_Z01_034',3,2,4,2,2,2,1,4,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1889,'PN_Z01_035',3,2,4,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1888,'PN_Z01_036',3,2,3,2,4,2,3,2,4,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1887,'PN_Z01_037',3,1,3,2,3,3,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1973,'PN_Z02_001',2,2,2,1,4,2,3,2,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1974,'PN_Z02_002',3,2,1,2,4,2,3,3,5,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1975,'PN_Z02_003',3,2,3,2,4,2,3,2,5,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1976,'PN_Z02_004',3,2,2,2,4,2,1,3,5,5);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1977,'PN_Z02_005',3,2,2,2,4,2,1,2,4,5);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1978,'PN_Z02_006',2,2,1,5,4,2,3,2,5,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1979,'PN_Z02_007',3,2,4,2,4,2,1,4,4,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1980,'PN_Z02_008',1,2,2,6,3,2,3,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1981,'PN_Z02_009',1,1,2,6,3,2,2,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1982,'PN_Z02_010',2,1,1,5,2,1,3,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1983,'PN_Z02_011',3,1,3,2,2,2,1,4,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1984,'PN_Z02_012',1,2,2,6,3,3,2,2,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1985,'PN_Z02_013',3,2,3,2,4,2,3,2,5,6);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1986,'PN_Z02_014',2,2,2,5,1,2,3,2,5,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1987,'PN_Z02_015',2,2,1,5,4,2,3,2,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1988,'PN_Z02_016',3,1,3,2,1,2,1,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1989,'PN_Z02_017',2,2,4,5,4,2,2,1,1,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1990,'PN_Z03_001',3,1,3,2,1,2,3,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1998,'PN_Z03_002',1,2,2,1,4,2,3,2,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1999,'PN_Z03_003',2,2,2,5,3,2,3,3,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2000,'PN_Z03_004',3,1,3,2,4,2,1,2,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2001,'PN_Z03_005',3,2,4,2,4,2,1,4,4,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2002,'PN_Z03_006',3,1,2,2,4,3,3,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2003,'PN_Z03_007',3,2,3,2,4,2,3,2,5,5);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2004,'PN_Z03_008',3,1,4,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2005,'PN_Z03_009',3,1,2,2,4,2,3,2,5,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2006,'PN_Z03_010',3,1,2,2,4,2,3,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2007,'PN_Z03_011',3,2,3,2,4,2,1,2,4,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2008,'PN_Z03_012',2,2,2,5,4,2,3,2,5,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2009,'PN_Z03_013',3,2,3,2,4,2,1,3,4,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2010,'PN_Z03_014',3,1,4,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2011,'PN_Z03_015',3,2,4,2,2,2,1,3,5,2);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2012,'PN_Z03_016',3,2,3,2,4,2,1,3,4,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2013,'PN_Z03_017',3,1,3,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2014,'PN_Z03_018',3,2,2,3,4,2,3,2,5,1);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2015,'PN_Z03_019',3,2,3,2,4,2,1,2,5,3);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2016,'PN_Z03_020',3,1,3,2,4,2,1,4,4,7);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2017,'PN_Z03_021',3,1,3,2,3,3,3,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2018,'PN_Z03_022',3,1,4,2,1,2,1,4,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2019,'PN_Z03_023',3,1,2,2,1,2,3,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1912,'PN_Z05_001',1,2,2,2,3,2,3,1,1,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1913,'PN_Z05_002',1,1,2,1,1,2,3,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1914,'PN_Z05_003',1,1,2,6,1,2,3,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1915,'PN_Z05_004',1,2,2,1,1,2,3,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1916,'PN_Z05_005',3,1,3,2,4,2,1,3,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1917,'PN_Z05_006',1,2,2,2,3,2,3,1,1,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1918,'PN_Z05_007',3,1,3,2,4,3,1,3,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1919,'PN_Z05_008',3,1,3,2,2,2,3,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1920,'PN_Z05_009',3,1,2,2,2,2,3,2,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1921,'PN_Z05_010',3,1,1,2,2,3,3,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1922,'PN_Z05_011',1,2,2,1,1,2,3,2,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1895,'PN_Z06_001',3,1,3,2,2,2,1,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1896,'PN_Z06_002',3,1,3,2,4,2,1,3,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1897,'PN_Z06_003',3,1,3,2,1,2,1,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1898,'PN_Z06_004',1,2,2,1,1,2,3,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1899,'PN_Z06_005',3,1,3,2,5,2,1,4,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1900,'PN_Z06_006',1,1,2,6,3,3,3,3,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1901,'PN_Z06_007',3,1,3,2,3,2,1,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1902,'PN_Z06_008',3,1,4,2,4,3,1,4,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1903,'PN_Z06_009',1,2,2,1,3,2,3,1,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1904,'PN_Z06_010',3,1,4,2,5,2,1,4,4,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1905,'PN_Z06_011',3,1,3,2,2,2,1,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1906,'PN_Z06_012',1,1,2,6,3,3,3,3,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1907,'PN_Z06_013',3,1,3,2,2,2,1,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1908,'PN_Z06_014',3,1,3,2,2,2,1,3,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1909,'PN_Z06_015',1,2,2,6,3,2,2,2,2,NULL);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1910,'PN_Z06_016',1,1,2,2,4,2,3,1,5,4);
INSERT INTO buildings(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1911,'PN_Z06_017',1,1,2,1,1,2,3,2,2,NULL);

INSERT INTO interventions(id,description) VALUES (1,'Openings in non-traditional materials');
INSERT INTO interventions(id,description) VALUES (2,'Non-traditional roof tiles');
INSERT INTO interventions(id,description) VALUES (3,'Joint filling with Portland cement-based mortar');
INSERT INTO interventions(id,description) VALUES (4,'Altered roof structure');
INSERT INTO interventions(id,description) VALUES (5,'Concrete elements added');
INSERT INTO interventions(id,description) VALUES (6,'Volumes reconstructed or plasters added');

INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_002',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_002',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_003',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_003',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_003',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_003',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_003',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_004',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_008',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_008',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_008',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_008',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_008',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_009',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_009',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_009',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_009',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_009',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_012',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_012',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_012',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_012',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_013',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_013',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_013',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_013',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_015',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_016',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_016',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_017',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_017',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_017',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_017',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_017',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_018',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_018',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_018',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_018',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_018',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_019',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_019',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_020',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_021',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_021',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_021',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_021',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_021',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_022',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_022',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_022',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_022',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_022',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_023',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_023',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_024',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_024',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_025',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_025',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_025',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_026',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_026',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_026',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_026',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_027',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_027',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_027',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_027',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_027',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_029',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_029',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_029',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_029',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_029',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_029',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_030',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_030',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_030',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_030',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_030',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_030',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_032',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_032',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_032',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_032',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_033',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_033',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_033',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_034',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_034',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z01_037',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_001',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_001',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_002',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_003',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_003',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_004',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_005',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_006',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_006',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_006',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_010',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_010',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_010',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_011',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_013',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_013',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_014',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_014',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_014',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_014',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_014',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_015',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_015',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_015',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_015',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z02_016',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_001',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_001',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_001',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_003',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_003',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_003',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_003',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_003',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_006',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_007',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_007',5);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_009',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_010',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_010',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_012',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_012',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_015',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_018',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_018',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_019',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_021',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_022',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_023',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_023',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_023',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z03_023',6);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z05_008',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z05_009',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z05_009',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z05_009',3);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z05_010',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z05_010',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_001',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_003',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_007',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_011',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_013',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_014',2);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_016',1);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_016',4);
INSERT INTO building_interventions(BuildingId,InterventionId) VALUES ('PN_Z06_016',5);
