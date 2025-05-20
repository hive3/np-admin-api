-- architectonic_adequacy definition

CREATE TABLE `architectonic_adequacy`(
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- conservation_level definition

CREATE TABLE `conservation_level` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- current_state definition

CREATE TABLE `current_state` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- facade_typology definition

CREATE TABLE `facade_typology` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- interventions definition

CREATE TABLE `intervention` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- openings definition

CREATE TABLE `opening` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- roof_coverings definition

CREATE TABLE `roof_covering` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- structural_systems definition

CREATE TABLE `structural_system` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- use_type definition

CREATE TABLE `use_type` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- wall_coverings definition

CREATE TABLE `wall_covering` (
	`id` int auto_increment primary key, 
	`description` varchar(255) NOT NULL, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- buildings definition

CREATE TABLE `building` (
	`id` int unsigned auto_increment primary key, 
	`fid` int unsigned, 
	`buildingId` varchar(255) NOT NULL, 
	`floors` int, 
	`OpeningId` int, 
	`StructuralSystemId` int, 
	`WallCoveringId` int, 
	`RoofCoveringId` int, 
	`UseTypeId` int, 
	`CurrentStateId` int, 
	`ConservationLevelId` int, 
	`ArchitectonicAdequacyId` int, 
	`FacadeTypologyId` int, 
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
	constraint building_opening_id_fk foreign key (OpeningId) references opening (id),
	constraint building_structural_system_id_fk foreign key (StructuralSystemId) references structural_system (id),
	constraint building_wall_covering_id_fk foreign key (WallCoveringId) references wall_covering (id),
	constraint building_roof_covering_id_fk foreign key (RoofCoveringId) references roof_covering (id),
	constraint building_use_type_id_fk foreign key (UseTypeId) references use_type (id),
	constraint building_current_state_id_fk foreign key (CurrentStateId) references current_state (id),
	constraint building_conservation_level_id_fk foreign key (ConservationLevelId) references conservation_level (id),
	constraint building_architectonic_adequacy_id_fk foreign key (ArchitectonicAdequacyId) references architectonic_adequacy (id),
	constraint building_facade_typology_id_fk foreign key (FacadeTypologyId) references facade_typology (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `buildings_building_id_uk` ON `building` (`buildingId`);
CREATE UNIQUE INDEX `buildings_fid_uk` ON `building` (`fid`);

-- building_interventions definition

CREATE TABLE `building_intervention` (
	`id` int unsigned auto_increment primary key, 
	`InterventionId` int not null, 
	`BuildingId` int unsigned not null,
	`createdAt` datetime default CURRENT_TIMESTAMP not null,
	`updatedAt` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
	constraint building_intervention_intervention_id_fk foreign key (intervention_id) references intervention (id),
	constraint building_intervention_building_id_fk foreign key (building_id) references building (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `building_intervention_building_id_intervention_id_uk` ON `building_intervention` (`BuildingId`, `InterventionId` );

-- data feed

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

INSERT INTO roof_covering(id,description) VALUES (1,'Ceramic');
INSERT INTO roof_covering(id,description) VALUES (2,'Mixed');
INSERT INTO roof_covering(id,description) VALUES (3,'Modern');
INSERT INTO roof_covering(id,description) VALUES (4,'Slate');
INSERT INTO roof_covering(id,description) VALUES (5,'Uncertain');

INSERT INTO wall_covering(id,description) VALUES (1,'Cement/Uncertain plaster');
INSERT INTO wall_covering(id,description) VALUES (2,'Granite');
INSERT INTO wall_covering(id,description) VALUES (3,'Lime/Earth Plaster');
INSERT INTO wall_covering(id,description) VALUES (4,'Mixed Traditional');
INSERT INTO wall_covering(id,description) VALUES (5,'Modern and Traditional');
INSERT INTO wall_covering(id,description) VALUES (6,'Modern Materials');

INSERT INTO opening(id,description) VALUES (1,'Mixed');
INSERT INTO opening(id,description) VALUES (2,'Modern Materials');
INSERT INTO opening(id,description) VALUES (3,'Traditional');
INSERT INTO opening(id,description) VALUES (4,'Voids');

INSERT INTO structural_system(id,description) VALUES (1,'Concrete');
INSERT INTO structural_system(id,description) VALUES (2,'Modern and Traditional');
INSERT INTO structural_system(id,description) VALUES (3,'Traditional Masonry');

INSERT INTO intervention(id,description) VALUES (1,'Openings in non-traditional materials');
INSERT INTO intervention(id,description) VALUES (2,'Non-traditional roof tiles');
INSERT INTO intervention(id,description) VALUES (3,'Joint filling with Portland cement-based mortar');
INSERT INTO intervention(id,description) VALUES (4,'Altered roof structure');
INSERT INTO intervention(id,description) VALUES (5,'Concrete elements added');
INSERT INTO intervention(id,description) VALUES (6,'Volumes reconstructed or plasters added');

INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1845,'PN_Z01_001',3,1,3,4,1,1,3,1,3,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1859,'PN_Z01_002',3,2,1,2,2,2,3,2,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1860,'PN_Z01_003',2,2,2,2,1,2,3,1,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1861,'PN_Z01_004',3,2,3,2,2,3,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1862,'PN_Z01_005',3,2,4,2,4,2,1,4,4,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1863,'PN_Z01_006',3,2,4,2,4,2,1,4,4,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1864,'PN_Z01_007',3,2,4,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1865,'PN_Z01_008',2,2,2,5,1,2,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1866,'PN_Z01_009',2,2,2,1,1,2,3,2,5,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1867,'PN_Z01_010',3,1,3,2,4,3,3,1,6,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1868,'PN_Z01_011',3,1,3,2,4,3,3,2,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1869,'PN_Z01_012',2,2,2,5,4,2,3,1,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1870,'PN_Z01_013',2,2,2,5,1,2,3,1,3,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1871,'PN_Z01_014',3,2,3,2,4,2,1,2,4,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1872,'PN_Z01_015',3,2,3,2,4,2,3,2,3,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1873,'PN_Z01_016',3,2,3,2,2,2,3,1,3,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1874,'PN_Z01_017',2,2,2,2,1,2,3,2,5,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1875,'PN_Z01_018',2,2,2,2,1,2,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1876,'PN_Z01_019',3,2,1,2,3,2,3,2,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1877,'PN_Z01_020',3,2,4,2,2,2,1,2,5,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1878,'PN_Z01_021',2,2,2,5,2,2,3,2,5,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1879,'PN_Z01_022',2,2,1,2,2,2,3,2,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1884,'PN_Z01_023',3,2,3,5,2,2,3,3,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1881,'PN_Z01_024',3,2,2,2,2,2,3,2,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1882,'PN_Z01_025',2,1,3,2,4,3,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1883,'PN_Z01_026',2,2,2,5,1,2,3,2,3,5);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1885,'PN_Z01_027',2,2,2,2,2,2,3,1,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1880,'PN_Z01_028',3,2,4,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1886,'PN_Z01_029',2,2,2,5,1,2,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1892,'PN_Z01_030',2,2,2,2,2,2,3,1,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1893,'PN_Z01_031',3,1,3,2,4,3,3,2,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1894,'PN_Z01_032',2,2,2,5,3,2,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1891,'PN_Z01_033',2,1,3,5,1,3,3,3,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1890,'PN_Z01_034',3,2,4,2,2,2,1,4,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1889,'PN_Z01_035',3,2,4,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1888,'PN_Z01_036',3,2,3,2,4,2,3,2,4,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1887,'PN_Z01_037',3,1,3,2,3,3,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1973,'PN_Z02_001',2,2,2,1,4,2,3,2,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1974,'PN_Z02_002',3,2,1,2,4,2,3,3,5,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1975,'PN_Z02_003',3,2,3,2,4,2,3,2,5,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1976,'PN_Z02_004',3,2,2,2,4,2,1,3,5,5);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1977,'PN_Z02_005',3,2,2,2,4,2,1,2,4,5);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1978,'PN_Z02_006',2,2,1,5,4,2,3,2,5,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1979,'PN_Z02_007',3,2,4,2,4,2,1,4,4,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1980,'PN_Z02_008',1,2,2,6,3,2,3,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1981,'PN_Z02_009',1,1,2,6,3,2,2,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1982,'PN_Z02_010',2,1,1,5,2,1,3,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1983,'PN_Z02_011',3,1,3,2,2,2,1,4,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1984,'PN_Z02_012',1,2,2,6,3,3,2,2,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1985,'PN_Z02_013',3,2,3,2,4,2,3,2,5,6);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1986,'PN_Z02_014',2,2,2,5,1,2,3,2,5,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1987,'PN_Z02_015',2,2,1,5,4,2,3,2,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1988,'PN_Z02_016',3,1,3,2,1,2,1,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1989,'PN_Z02_017',2,2,4,5,4,2,2,1,1,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1990,'PN_Z03_001',3,1,3,2,1,2,3,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1998,'PN_Z03_002',1,2,2,1,4,2,3,2,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1999,'PN_Z03_003',2,2,2,5,3,2,3,3,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2000,'PN_Z03_004',3,1,3,2,4,2,1,2,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2001,'PN_Z03_005',3,2,4,2,4,2,1,4,4,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2002,'PN_Z03_006',3,1,2,2,4,3,3,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2003,'PN_Z03_007',3,2,3,2,4,2,3,2,5,5);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2004,'PN_Z03_008',3,1,4,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2005,'PN_Z03_009',3,1,2,2,4,2,3,2,5,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2006,'PN_Z03_010',3,1,2,2,4,2,3,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2007,'PN_Z03_011',3,2,3,2,4,2,1,2,4,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2008,'PN_Z03_012',2,2,2,5,4,2,3,2,5,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2009,'PN_Z03_013',3,2,3,2,4,2,1,3,4,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2010,'PN_Z03_014',3,1,4,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2011,'PN_Z03_015',3,2,4,2,2,2,1,3,5,2);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2012,'PN_Z03_016',3,2,3,2,4,2,1,3,4,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2013,'PN_Z03_017',3,1,3,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2014,'PN_Z03_018',3,2,2,3,4,2,3,2,5,1);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2015,'PN_Z03_019',3,2,3,2,4,2,1,2,5,3);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2016,'PN_Z03_020',3,1,3,2,4,2,1,4,4,7);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2017,'PN_Z03_021',3,1,3,2,3,3,3,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2018,'PN_Z03_022',3,1,4,2,1,2,1,4,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (2019,'PN_Z03_023',3,1,2,2,1,2,3,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1912,'PN_Z05_001',1,2,2,2,3,2,3,1,1,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1913,'PN_Z05_002',1,1,2,1,1,2,3,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1914,'PN_Z05_003',1,1,2,6,1,2,3,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1915,'PN_Z05_004',1,2,2,1,1,2,3,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1916,'PN_Z05_005',3,1,3,2,4,2,1,3,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1917,'PN_Z05_006',1,2,2,2,3,2,3,1,1,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1918,'PN_Z05_007',3,1,3,2,4,3,1,3,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1919,'PN_Z05_008',3,1,3,2,2,2,3,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1920,'PN_Z05_009',3,1,2,2,2,2,3,2,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1921,'PN_Z05_010',3,1,1,2,2,3,3,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1922,'PN_Z05_011',1,2,2,1,1,2,3,2,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1895,'PN_Z06_001',3,1,3,2,2,2,1,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1896,'PN_Z06_002',3,1,3,2,4,2,1,3,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1897,'PN_Z06_003',3,1,3,2,1,2,1,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1898,'PN_Z06_004',1,2,2,1,1,2,3,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1899,'PN_Z06_005',3,1,3,2,5,2,1,4,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1900,'PN_Z06_006',1,1,2,6,3,3,3,3,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1901,'PN_Z06_007',3,1,3,2,3,2,1,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1902,'PN_Z06_008',3,1,4,2,4,3,1,4,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1903,'PN_Z06_009',1,2,2,1,3,2,3,1,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1904,'PN_Z06_010',3,1,4,2,5,2,1,4,4,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1905,'PN_Z06_011',3,1,3,2,2,2,1,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1906,'PN_Z06_012',1,1,2,6,3,3,3,3,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1907,'PN_Z06_013',3,1,3,2,2,2,1,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1908,'PN_Z06_014',3,1,3,2,2,2,1,3,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1909,'PN_Z06_015',1,2,2,6,3,2,2,2,2,NULL);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1910,'PN_Z06_016',1,1,2,2,4,2,3,1,5,4);
INSERT INTO building(fid,buildingId,StructuralSystemId,floors,OpeningId,WallCoveringId,RoofCoveringId,UseTypeId,CurrentStateId,ConservationLevelId,ArchitectonicAdequacyId,FacadeTypologyId) VALUES (1911,'PN_Z06_017',1,1,2,1,1,2,3,2,2,NULL);

INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (2,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (2,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (3,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (3,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (3,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (3,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (3,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (4,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (8,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (8,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (8,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (8,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (8,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (9,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (9,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (9,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (9,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (9,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (12,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (12,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (12,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (12,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (13,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (13,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (13,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (13,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (15,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (16,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (16,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (17,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (17,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (17,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (17,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (17,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (18,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (18,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (18,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (18,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (18,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (19,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (19,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (20,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (21,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (21,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (21,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (21,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (21,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (22,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (22,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (22,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (22,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (22,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (23,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (23,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (24,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (24,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (25,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (25,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (25,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (26,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (26,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (26,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (26,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (27,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (27,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (27,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (27,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (27,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (29,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (29,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (29,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (29,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (29,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (29,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (30,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (30,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (30,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (30,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (30,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (30,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (32,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (32,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (32,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (32,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (33,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (33,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (33,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (34,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (34,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (37,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (38,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (38,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (39,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (40,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (40,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (41,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (42,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (43,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (43,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (43,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (47,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (47,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (47,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (48,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (50,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (50,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (51,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (51,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (51,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (51,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (51,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (52,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (52,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (52,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (52,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (53,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (55,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (55,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (55,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (57,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (57,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (57,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (57,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (57,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (60,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (61,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (61,5);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (63,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (64,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (64,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (66,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (66,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (69,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (72,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (72,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (73,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (75,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (76,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (77,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (77,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (77,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (77,6);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (85,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (86,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (86,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (86,3);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (87,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (87,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (89,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (91,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (95,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (99,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (101,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (102,2);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (104,1);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (104,4);
INSERT INTO building_intervention(BuildingId,InterventionId) VALUES (104,5);