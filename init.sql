CREATE DATABASE IF NOT EXISTS assetManagementSystem;

use assetManagementSystem;

CREATE TABLE IF NOT EXISTS `userrole`(
    `UserRoleId`int NOT NULL AUTO_INCREMENT,
    `UserRoleName`varchar (255) NOT NULL,
    `UserRoleDescription` text NOT NULL,
    `UserRoleCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UserRoleUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`UserRoleId`),
    UNIQUE KEY `UserRoleId`(`UserRoleId`));

INSERT INTO userrole(userrolename,userroledescription)
values
    ('admin','access every thing'),
    ('supporter','access every thing inside the regin'),
    ('usual user','access just information about own');

CREATE TABLE IF NOT EXISTS `user`(
    `UserId` int NOT NULL AUTO_INCREMENT,
    `UserPersonalId` int NOT NULL,
    `UserName` varchar (255) NOT NULL,
    `UserLastName` varchar (255) NOT NULL,
    `UserPhoneNumber` varchar (11) DEFAULT NULL,
    `UserLandLinePhoneNumber` varchar(11) DEFAULT NULL,
    `CreaterUserId` int DEFAULT NULL,
    `UpdaterUserId` int DEFAULT NULL,
    `UserSupportId` int NULL,
    `UserCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UserUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `UserPasword` varchar(128) NOT NULL,
    `UserRoleId` int NOT NULL,
    `last_login` datetime(6) DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT '1',
    `is_anonymous` tinyint(1) DEFAULT '1',
    `is_authenticated` tinyint(1) DEFAULT '0',
    PRIMARY KEY(`UserId`),
    UNIQUE KEY `UserId`( `UserId`),
    UNIQUE KEY `UserPersonalId`(`UserPersonalId`),
    KEY `CreaterUserId`(`CreaterUserId`),
    KEY `UpdaterUserId`(`UpdaterUserId`),
    KEY `UserRoleId`(`UserRoleId`),
    CONSTRAINT `user_ibfk_1` FOREIGN KEY(`CreaterUserId`) REFERENCES `user`(`UserId`) ON UPDATE CASCADE,
    CONSTRAINT `user_ibfk_2` FOREIGN KEY(`UpdaterUserId`) REFERENCES `user`(`UserId`)  ON UPDATE CASCADE,
    CONSTRAINT `user_ibfk_3` FOREIGN KEY (`UserSupportId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
    CONSTRAINT `UserRoleId` FOREIGN KEY(`UserRoleId`) REFERENCES `userrole`(`UserRoleId`)ON UPDATE CASCADE
    );

INSERT INTO user(userpersonalid,username,userlastname,userphonenumber,userlandlinephonenumber,userpasword,userroleid,is_active,is_anonymous,is_authenticated)
    VALUES
-- (1,'admin','admin','09021780622','0416666605','admin123',1,True,True,False);
(1,'admin','admin','09021780622','0416666605','pbkdf2_sha256$720000$TebWIwDa4dnsBUIFIfCcqN$uPfUyROfDSgUYCbv0mFhEfijGnaLzFcuVAMydj9gT8E=',1,True,True,False);

CREATE TABLE IF NOT EXISTS `auth_user`
(
    `UserPasword`varchar(128) NOT NULL,
    `last_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `is_superuser` tinyint(1) NOT NULL,
    `UserId` int NOT NULL,
    `is_active` tinyint(1) DEFAULT '1',
    `is_authenticated` tinyint(1) DEFAULT '0',
    KEY `UserId`(`UserId`),
    CONSTRAINT `auth_user_ibfk_1` FOREIGN KEY(`UserId`) REFERENCES `user`(`UserId`) ON UPDATE CASCADE);

INSERT INTO auth_user
(userpasword,is_superuser,userid,is_active,is_authenticated)
VALUES('password',True,1,True,True);

CREATE TABLE  IF NOT EXISTS `area` (
  `AreaId` int NOT NULL AUTO_INCREMENT,
  `AreaName` varchar(255) NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `AreaCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `AreaUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`AreaId`),
  UNIQUE KEY `AreaId` (`AreaId`),
  KEY `CreaterUserId` (`CreaterUserId`),
  KEY `UpdaterUserId` (`UpdaterUserId`),
  CONSTRAINT `area_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `area_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`)  ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `building` (
  `BuildingId` int NOT NULL AUTO_INCREMENT,
  `BuildingName` varchar(255) NOT NULL,
  `BuildingAbbrivationName` varchar(255) NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `BuildingCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `BuildingUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `BuildingFloorCount` int NOT NULL,
  `BuildingRoomCount` int NOT NULL,
  PRIMARY KEY (`BuildingId`),
  UNIQUE KEY `BuildingId` (`BuildingId`),
  KEY `CreaterUserId` (`CreaterUserId`),
  KEY `UpdaterUserId` (`UpdaterUserId`),
  CONSTRAINT `building_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `building_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`)  ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS  `availablefloortousersupport` (
  `BuildingId` int NOT NULL,
  `UserSupportId` int NOT NULL,
  `AvailableFloor` int NOT NULL,
  PRIMARY KEY (`UserSupportId`,`BuildingId`,`AvailableFloor`),
  KEY `BuildingId` (`BuildingId`),
  CONSTRAINT `availablefloortousersupport_ibfk_1` FOREIGN KEY (`UserSupportId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `availablefloortousersupport_ibfk_2` FOREIGN KEY (`BuildingId`) REFERENCES `building` (`BuildingId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `userlocationinbuildingarea` (
  `BuildingId` int NOT NULL,
  `UserId` int NOT NULL,
  `AreaId` int NOT NULL,
  `UserOfficial` varchar(255) NOT NULL,
  `RoomNumber` int NOT NULL,
  PRIMARY KEY (`UserId`,`BuildingId`,`AreaId`),
  KEY `BuildingId` (`BuildingId`),
  KEY `AreaId` (`AreaId`),
  CONSTRAINT `userlocationinbuildingarea_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `userlocationinbuildingarea_ibfk_2` FOREIGN KEY (`BuildingId`) REFERENCES `building` (`BuildingId`) ON UPDATE CASCADE,
  CONSTRAINT `userlocationinbuildingarea_ibfk_3` FOREIGN KEY (`AreaId`) REFERENCES `area` (`AreaId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `operationsystem` (
  `OperationSystemId` int NOT NULL AUTO_INCREMENT,
  `OperationSystemName` varchar(255) NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `OperationSystemCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `OperationSystemUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OperationSystemId`),
  UNIQUE KEY `OperationSystemId` (`OperationSystemId`),
  KEY `operationsystem_ibfk_1` (`CreaterUserId`),
  KEY `operationsystem_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `operationsystem_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `operationsystem_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `operationsystemversion` (
  `OperationSystemVersionId` int NOT NULL AUTO_INCREMENT,
  `OperationSystemVersionName` varchar(255) NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` inT DEFAULT NULL,
  `OperationSystemId` int NOT NULL,
  `OperationSystemVersionCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `OperationSystemVersionUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OperationSystemVersionId`),
  UNIQUE KEY `OperationSystemVersionId` (`OperationSystemVersionId`),
  KEY `operationsystemversion_ibfk_1` (`CreaterUserId`),
  KEY `operationsystemversion_ibfk_2` (`UpdaterUserId`),
  KEY `operationsystemversion_ibfk_3` (`OperationSystemId`),
  CONSTRAINT `operationsystemversion_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `operationsystemversion_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `operationsystemversion_ibfk_3` FOREIGN KEY (`OperationSystemId`) REFERENCES `operationsystem` (`OperationSystemId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `computer` (
  `ComputerPropertyNumber` int NOT NULL,
  `ComputerName` varchar(255) NULL,
  `ComputerModel` varchar(255) NOT NULL,
  `ComputerIP` varchar(15) NOT NULL,
  `ComputerMacAddress` text NOT NULL,
  `ComputerIsPersonal` tinyint(1) NOT NULL,
  `ComputerCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ComputerUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `OwnerUserId` int DEFAULT NULL,
  `OperationSystemVersionId` int NOT NULL,
  `AreaId` int DEFAULT NULL,
  `BuildingId` int DEFAULT NULL,
  PRIMARY KEY (`ComputerPropertyNumber`),
  UNIQUE KEY `ComputerIP` (`ComputerIP`),
  UNIQUE KEY `ComputerPropertyNumber` (`ComputerPropertyNumber`),
  KEY `computer_ibfk_1` (`CreaterUserId`),
  KEY `computer_ibfk_2` (`UpdaterUserId`),
  KEY `computer_ibfk_3` (`OwnerUserId`),
  KEY `computer_ibfk_4` (`OperationSystemVersionId`),
  KEY `computer_ibfk_5` (`AreaId`),
  KEY `computer_ibfk_6` (`BuildingId`),
  CONSTRAINT `computer_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `computer_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `computer_ibfk_3` FOREIGN KEY (`OwnerUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `computer_ibfk_4` FOREIGN KEY (`OperationSystemVersionId`) REFERENCES `operationsystemversion` (`OperationSystemVersionId`) ON UPDATE CASCADE,
  CONSTRAINT `computer_ibfk_5` FOREIGN KEY (`AreaId`) REFERENCES `area` (`AreaId`) ON UPDATE CASCADE,
  CONSTRAINT `computer_ibfk_6` FOREIGN KEY (`BuildingId`) REFERENCES `building` (`BuildingId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `goodsgroup` (
  `GooodsGroupId` int NOT NULL AUTO_INCREMENT,
  `GooodsGroupName` varchar(255) NOT NULL,
  `IsPartInsideComputer` tinyint(1) NOT NULL,
  `IsAllowedToSendOut` tinyint(1) NOT NULL,
  `IsAllowedToBeAborted` tinyint(1) NOT NULL,
  `IsAllowedToMove` tinyint(1) NOT NULL,
  `IsPossibleToRepair` tinyint(1) NOT NULL,
  `GooodsGroupCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `GooodsGroupUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  PRIMARY KEY (`GooodsGroupId`),
  UNIQUE KEY `GooodsGroupId` (`GooodsGroupId`),
  KEY `goodsgroup_ibfk_1` (`CreaterUserId`),
  KEY `goodsgroup_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `goodsgroup_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goodsgroup_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `attributecategory` (
  `AttributeCategoryId` int NOT NULL AUTO_INCREMENT,
  `AttributeCategoryName` varchar(255) NOT NULL,
  `AttributeCategoryCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `AttributeCategoryUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  PRIMARY KEY (`AttributeCategoryId`),
  UNIQUE KEY `AttributeCategoryId` (`AttributeCategoryId`),
  KEY `attributecategory_ibfk_1` (`CreaterUserId`),
  KEY `attributecategory_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `attributecategory_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `attributecategory_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `goodsattributes` (
  `GoodsAttributesId` int NOT NULL AUTO_INCREMENT,
  `GoodsAttributesTitle` varchar(255) NOT NULL,
  `GoodsAttributesType` int NOT NULL,
  `GoodsAttributesCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `GoodsAttributesUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  PRIMARY KEY (`GoodsAttributesId`),
  UNIQUE KEY `GoodsAttributesId` (`GoodsAttributesId`),
  KEY `goodsattributes_ibfk_1` (`CreaterUserId`),
  KEY `goodsattributes_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `goodsattributes_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goodsattributes_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goodsattributes_chk_1` CHECK (((`GoodsAttributesType` = 1) or (`GoodsAttributesType` = 2)))
);

CREATE TABLE  IF NOT EXISTS `goodsgroup_attributecategory_goodsattributes_order` (
  `GoodsAttributesId` int NOT NULL,
  `AttributeCategoryId` int NOT NULL,
  `GooodsGroupId` int NOT NULL,
  `Order` int NOT NULL,
  PRIMARY KEY (`GoodsAttributesId`,`GooodsGroupId`),
  UNIQUE KEY `Order` (`Order`),
  KEY `fk_attributecategory_order` (`AttributeCategoryId`),
  KEY `fk_goodsgroup_order` (`GooodsGroupId`),
  CONSTRAINT `fk_attributecategory_order` FOREIGN KEY (`AttributeCategoryId`) REFERENCES `attributecategory` (`AttributeCategoryId`) ON UPDATE CASCADE,
  CONSTRAINT `fk_goodsattributes_order` FOREIGN KEY (`GoodsAttributesId`) REFERENCES `goodsattributes` (`GoodsAttributesId`) ON UPDATE CASCADE,
  CONSTRAINT `fk_goodsgroup_order` FOREIGN KEY (`GooodsGroupId`) REFERENCES `goodsgroup` (`GooodsGroupId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `goodsattributesdefaultvalue` (
  `GoodsAttributesId` int NOT NULL,
  `DefaultAttributes` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `DefaultAttributesCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DefaultAttributesUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int DEFAULT NULL,
  `UpdaterUserId` int DEFAULT NULL,

  PRIMARY KEY (`GoodsAttributesId`,`DefaultAttributes`),
  KEY `goodsattributesdefaultvalue_ibfk_1` (`CreaterUserId`),
  KEY `goodsattributesdefaultvalue_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `goodsattributesdefaultvalue_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goodsattributesdefaultvalue_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goodsattributesdefaultvalue_ibfk_3` FOREIGN KEY (`GoodsAttributesId`) REFERENCES `goodsattributes` (`GoodsAttributesId`) ON UPDATE CASCADE

);

CREATE TABLE  IF NOT EXISTS `goods` (
  `GoodsId` int NOT NULL AUTO_INCREMENT,
  `GoodsName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `GooodsGroupId` int NOT NULL,
  `GoodsCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `GoodsUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  PRIMARY KEY (`GoodsId`),
  UNIQUE KEY `GoodsId` (`GoodsId`),
  KEY `goods_ibfk_1` (`CreaterUserId`),
  KEY `goods_ibfk_2` (`UpdaterUserId`),
  KEY `goods_ibfk_3` (`GooodsGroupId`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goods_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `goods_ibfk_3` FOREIGN KEY (`GooodsGroupId`) REFERENCES `goodsgroup` (`GooodsGroupId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `assinedattributestogoods` (
  `GoodsId` int NOT NULL ,
  `GoodsAttributesId` int NOT NULL,
  `attributevalue` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`GoodsId`,`GoodsAttributesId`),
  KEY `assinedattributestogoods_ibfk_1` (`GoodsAttributesId`),
  CONSTRAINT `assinedattributestogoods_ibfk_1` FOREIGN KEY (`GoodsAttributesId`) REFERENCES `goodsattributes` (`GoodsAttributesId`) ON UPDATE CASCADE,
  CONSTRAINT `assinedattributestogoods_ibfk_2` FOREIGN KEY (`GoodsId`) REFERENCES `goods` (`GoodsId`) ON UPDATE CASCADE
);

create table if not exists `updater`(
	`UpdaterId` INT NOT NULL AUTO_INCREMENT,
    `UpdaterCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`UpdaterUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`UpdaterDoneTime` date not null,
	`CreaterUserId` int NOT NULL,
    `UpdaterUserId` int DEFAULT NULL,
    `OwnerUserId` int DEFAULT NULL,
    PRIMARY KEY(`UpdaterId`),
    UNIQUE KEY `UpdaterId`( `UpdaterId`),
	CONSTRAINT `updater_ibfk_1` FOREIGN KEY(`CreaterUserId`) REFERENCES `user`(`UserId`) ON UPDATE CASCADE,
    CONSTRAINT `updater_ibfk_2` FOREIGN KEY(`UpdaterUserId`) REFERENCES `user`(`UserId`) ON UPDATE CASCADE,
    CONSTRAINT `updater_ibfk_3` FOREIGN KEY(`OwnerUserId`) REFERENCES `user`(`UserId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `deliveredgoods` (
  `DeliveredGoodsId` int NOT NULL AUTO_INCREMENT,
  `DeliveredGoodsSerial` int NOT NULL,
  `DeliveredGoodsCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DeliveredGoodsUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int DEFAULT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `OwnerUserId` int DEFAULT NULL,
  `UpdaterId` int DEFAULT NULL,
  `RelatedComputerPropertyNumber` int DEFAULT NULL,
  `GoodsId` int NOT NULL,
  `AreaId` int DEFAULT NULL,
  `BuildingId` int DEFAULT NULL,
  PRIMARY KEY (`DeliveredGoodsId`),
  UNIQUE KEY `DeliveredGoodsSerial` (`DeliveredGoodsSerial`),
  UNIQUE KEY `DeliveredGoodsId` (`DeliveredGoodsId`),
  KEY `deliveredgoods_ibfk_1` (`CreaterUserId`),
  KEY `deliveredgoods_ibfk_2` (`UpdaterUserId`),
  KEY `deliveredgoods_ibfk_3` (`OwnerUserId`),
  KEY `deliveredgoods_ibfk_4` (`UpdaterId`),
  KEY `deliveredgoods_ibfk_5` (`RelatedComputerPropertyNumber`),
  KEY `deliveredgoods_ibfk_6` (`GoodsId`),
  KEY `deliveredgoods_ibfk_7` (`AreaId`),
  KEY `deliveredgoods_ibfk_8` (`BuildingId`),
  CONSTRAINT `deliveredgoods_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_3` FOREIGN KEY (`OwnerUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_4` FOREIGN KEY (`UpdaterId`) REFERENCES `updater` (`UpdaterId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_5` FOREIGN KEY (`RelatedComputerPropertyNumber`) REFERENCES `computer` (`ComputerPropertyNumber`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_6` FOREIGN KEY (`GoodsId`) REFERENCES `goods` (`GoodsId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_7` FOREIGN KEY (`AreaId`) REFERENCES `area` (`AreaId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoods_ibfk_8` FOREIGN KEY (`BuildingId`) REFERENCES `building` (`BuildingId`) ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS `ticketstatus` (
  `TicketStatusId` int NOT NULL AUTO_INCREMENT,
  `TicketStatusName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `TicketStatusCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TicketStatusUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TicketStatusId`),
  UNIQUE KEY `TicketStatusId` (`TicketStatusId`)
);

INSERT INTO ticketstatus(TicketStatusName)
VALUES
    ('در انتظار پاسخ'),
    ('در حال پیگیری'),
    ('بسته شده'),
    ('رد شده'),
    ('حل شده');

CREATE TABLE  IF NOT EXISTS `ticketsubject` (
  `TicketSubjectId` int NOT NULL AUTO_INCREMENT,
  `TicketSubjectName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `TicketSubjectCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TicketSubjectUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TicketSubjectId`),
  UNIQUE KEY `TicketSubjectId` (`TicketSubjectId`)
                            );

INSERT INTO ticketsubject (TicketSubjectName)
VALUES
    ('جابه جایی'),
    ('اسقاط'),
    ('بروزرسانی'),
    ('تعمیر داخلی'),
    ('عملیات نصب'),
    ('سند ارسال به بیرون');

CREATE TABLE IF NOT EXISTS `ticket` (
  `TicketId` int NOT NULL AUTO_INCREMENT,
  `TicketStatusId` int NOT NULL,
  `TicketSubjectId` int NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `TicketCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TicketUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TicketDescription` text NOT NULL,
  `DeliveredGoodsId` int DEFAULT NULL,
  `ComputerPropertyNumber` int DEFAULT NULL,
  PRIMARY KEY (`TicketId`),
  KEY `ticket_ibfk_1` (`TicketStatusId`),
  KEY `ticket_ibfk_2` (`TicketSubjectId`),
  KEY `ticket_ibfk_3` (`CreaterUserId`),
  KEY `ticket_ibfk_4` (`DeliveredGoodsId`),
  KEY `ticket_ibfk_5` (`ComputerPropertyNumber`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`TicketStatusId`) REFERENCES `ticketstatus` (`TicketStatusId`) ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`TicketSubjectId`) REFERENCES `ticketsubject` (`TicketSubjectId`) ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_4` FOREIGN KEY (`DeliveredGoodsId`) REFERENCES `deliveredgoods` (`DeliveredGoodsId`) ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_5` FOREIGN KEY (`ComputerPropertyNumber`) REFERENCES `computer` (`ComputerPropertyNumber`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `usersrefferdedticket` (
  `RefferedUserId` int NOT NULL,
  `TicketId` int NOT NULL,
  `RefferedTicketDate` datetime NOT NULL,
  `RefferedTicketDescription` text NOT NULL,
  PRIMARY KEY (`RefferedUserId`,`TicketId`),
  KEY `usersrefferdedticket_ibfk_2` (`TicketId`),
  CONSTRAINT `usersrefferdedticket_ibfk_1` FOREIGN KEY (`RefferedUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `usersrefferdedticket_ibfk_2` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE
);

ALTER TABLE `updater`
ADD `TicketId` INT NOT NULL,
ADD KEY `updater_ibfk_4` (`TicketId`),
ADD CONSTRAINT `updater_ibfk_4` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE;


CREATE TABLE IF NOT EXISTS `replacementdeliveygoodsinupdate` (
  `UpdaterId` int NOT NULL,
  `DeliveredGoodsId` int NOT NULL,
  `ReplacementDescription` text NOT NULL,
  PRIMARY KEY (`UpdaterId`,`DeliveredGoodsId`),
  KEY `replacementdeliveygoodsinupdate_ibfk_2` (`DeliveredGoodsId`),
  CONSTRAINT `replacementdeliveygoodsinupdate_ibfk_1` FOREIGN KEY (`UpdaterId`) REFERENCES `updater` (`UpdaterId`) ON UPDATE CASCADE,
  CONSTRAINT `replacementdeliveygoodsinupdate_ibfk_2` FOREIGN KEY (`DeliveredGoodsId`) REFERENCES `deliveredgoods` (`DeliveredGoodsId`) ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS `exchanging` (
  `ExchangingId` int NOT NULL AUTO_INCREMENT,
  `ExchangingDescription` text NOT NULL,
  `ExchangingUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `UserExchangerId` int NOT NULL ,
  `TicketId` INT NULL,
  PRIMARY KEY (`ExchangingId`),
  UNIQUE KEY `ExchangingId` (`ExchangingId`),
  KEY `exchanging_ibfk_1` (`CreaterUserId`),
  KEY `exchanging_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `exchanging_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `exchanging_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `exchanging_ibfk_3` FOREIGN KEY (`UserExchangerId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `exchanging_ibfk_4` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `deliveredgoodsexchanging` (
  `DeliveredGoodsId` int NOT NULL,
  `ExchangingId` int NOT NULL,
  `CreateTime` date NOT NULL,
  `DoneTime` date DEFAULT NULL,
  PRIMARY KEY (`DeliveredGoodsId`,`ExchangingId`),
  KEY `deliveredgoodsexchanging_ibfk_1` (`ExchangingId`),
  CONSTRAINT `deliveredgoodsexchanging_ibfk_1` FOREIGN KEY (`ExchangingId`) REFERENCES `exchanging` (`ExchangingId`) ON UPDATE CASCADE,
  CONSTRAINT `deliveredgoodsexchanging_ibfk_2` FOREIGN KEY (`DeliveredGoodsId`) REFERENCES `deliveredgoods` (`DeliveredGoodsId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `computersexchanging` (
  `ComputerPropertyNumber` int NOT NULL,
  `ExchangingId` int NOT NULL,
  `CreateTime` date NOT NULL,
  `DoneTime` date Not NULL,
  PRIMARY KEY (`ComputerPropertyNumber`,`ExchangingId`),
  KEY `computersexchanging_ibfk_1` (`ExchangingId`),
  CONSTRAINT `computersexchanging_ibfk_1` FOREIGN KEY (`ExchangingId`) REFERENCES `exchanging` (`ExchangingId`) ON UPDATE CASCADE,
  CONSTRAINT `computersexchanging_ibfk_2` FOREIGN KEY (`ComputerPropertyNumber`) REFERENCES `computer` (`ComputerPropertyNumber`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `abortion` (
  `AbortionId` int NOT NULL AUTO_INCREMENT,
  `AbortionCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `AbortionUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `AbortionDoneTime` date NOT NULL,
  `CreaterUserId` int NOT NULL,
  `OwnerUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `DeliveredGoodsId` int DEFAULT NULL,
  `ComputerPropertyNumber` int DEFAULT NULL,
  `TicketId` int NOT NULL,
  PRIMARY KEY (`AbortionId`),
  UNIQUE KEY `AbortionId` (`AbortionId`),
  KEY `abortion_ibfk_1` (`CreaterUserId`),
  KEY `abortion_ibfk_2` (`UpdaterUserId`),
  KEY `abortion_ibfk_3` (`OwnerUserId`),
  KEY `abortion_ibfk_4` (`DeliveredGoodsId`),
  KEY `abortion_ibfk_5` (`ComputerPropertyNumber`),
  KEY `abortion_ibfk_6` (`TicketId`),
  CONSTRAINT `abortion_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `abortion_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `abortion_ibfk_3` FOREIGN KEY (`OwnerUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `abortion_ibfk_4` FOREIGN KEY (`DeliveredGoodsId`) REFERENCES `deliveredgoods` (`DeliveredGoodsId`) ON UPDATE CASCADE,
  CONSTRAINT `abortion_ibfk_5` FOREIGN KEY (`ComputerPropertyNumber`) REFERENCES `computer` (`ComputerPropertyNumber`) ON UPDATE CASCADE,
  CONSTRAINT `abortion_ibfk_6` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `internalrepair` (
  `InternalRepairId` int NOT NULL AUTO_INCREMENT,
  `InternalRepairDescription` text NOT NULL,
  `InternalRepairChangingDescription` text NOT NULL,
  `InternalRepairCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `InternalRepairUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `InternalRepairDoneTime` date NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `DeliveredGoodsId` int NOT NULL,
  `TicketId` int NOT NULL,
  PRIMARY KEY (`InternalRepairId`),
  UNIQUE KEY `InternalRepairId` (`InternalRepairId`),
  KEY `internalrepair_ibfk_1` (`CreaterUserId`),
  KEY `internalrepair_ibfk_2` (`UpdaterUserId`),
  KEY `internalrepair_ibfk_3` (`DeliveredGoodsId`),
  KEY `internalrepair_ibfk_4` (`TicketId`),
  CONSTRAINT `internalrepair_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `internalrepair_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `internalrepair_ibfk_3` FOREIGN KEY (`DeliveredGoodsId`) REFERENCES `deliveredgoods` (`DeliveredGoodsId`) ON UPDATE CASCADE,
  CONSTRAINT `internalrepair_ibfk_4` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `outbounddocument` (
  `OutboundDocumentSeriaL` int NOT NULL AUTO_INCREMENT,
  `OutboundDocumentDescription` text NOT NULL,
  `OutboundDocumentCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `OutboundDocumentUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `OutboundDocumentDoneTime` date NOT NULL,
  `DeliveredGoodsId` int NOT NULL,
  `CreaterUserId` int NOT NULL,
  `OwnerUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `TicketId` int NOT NULL,
  PRIMARY KEY (`OutboundDocumentSeriaL`),
  UNIQUE KEY `OutboundDocumentSeriaL` (`OutboundDocumentSeriaL`),
  KEY `outbounddocument_ibfk_1` (`DeliveredGoodsId`),
  KEY `outbounddocument_ibfk_2` (`CreaterUserId`),
  KEY `outbounddocument_ibfk_3` (`UpdaterUserId`),
  KEY `outbounddocument_ibfk_4` (`OwnerUserId`),
  KEY `outbounddocument_ibfk_5` (`TicketId`),
  CONSTRAINT `outbounddocument_ibfk_1` FOREIGN KEY (`DeliveredGoodsId`) REFERENCES `deliveredgoods` (`DeliveredGoodsId`) ON UPDATE CASCADE,
  CONSTRAINT `outbounddocument_ibfk_2` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `outbounddocument_ibfk_3` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `outbounddocument_ibfk_4` FOREIGN KEY (`OwnerUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `outbounddocument_ibfk_5` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `installation` (
  `InstallationId` int NOT NULL AUTO_INCREMENT,
  `InstallationDescription` text NOT NULL,
  `InstallationUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TicketId` int NOT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  PRIMARY KEY (`InstallationId`),
  UNIQUE KEY `InstallationId` (`InstallationId`),
  KEY `installation_ibfk_1` (`TicketId`),
  KEY `installation_ibfk_2` (`CreaterUserId`),
  KEY `installation_ibfk_3` (`UpdaterUserId`),
  CONSTRAINT `installation_ibfk_1` FOREIGN KEY (`TicketId`) REFERENCES `ticket` (`TicketId`) ON UPDATE CASCADE,
  CONSTRAINT `installation_ibfk_2` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `installation_ibfk_3` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `softwares` (
  `SoftwareId` int NOT NULL AUTO_INCREMENT,
  `SoftwareName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `SoftwareCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SoftwareUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  PRIMARY KEY (`SoftwareId`),
  UNIQUE KEY `SoftwareId` (`SoftwareId`),
  KEY `softwares_ibfk_1` (`CreaterUserId`),
  KEY `softwares_ibfk_2` (`UpdaterUserId`),
  CONSTRAINT `softwares_ibfk_1` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `softwares_ibfk_2` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `softwaresininstallization` (
  `InstallationId` int NOT NULL,
  `SoftwareId` int NOT NULL,
  `UsageOfSoftwaresInInstallization` text NOT NULL,
  PRIMARY KEY (`InstallationId`,`SoftwareId`),
  KEY `softwaresininstallization_ibfk_1` (`InstallationId`),
  KEY `softwaresininstallization_ibfk_2` (`SoftwareId`),
  CONSTRAINT `softwaresininstallization_ibfk_1` FOREIGN KEY (`InstallationId`) REFERENCES `installation` (`InstallationId`) ON UPDATE CASCADE,
  CONSTRAINT `softwaresininstallization_ibfk_2` FOREIGN KEY (`SoftwareId`) REFERENCES `softwares` (`SoftwareId`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `installizationsoncomputer` (
   `InstallationId` int NOT NULL,
  `ComputerPropertyNumber` int NOT NULL,
  `InstallationCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `InstallationDoneTime` date NOT NULL,
  PRIMARY KEY (`InstallationId`,`ComputerPropertyNumber`),
  KEY `installizationoncomputer_ibfk_1` (`InstallationId`),
  KEY `installizationoncomputer_ibfk_2` (`ComputerPropertyNumber`),
  CONSTRAINT `installizationoncomputer_ibfk_1` FOREIGN KEY (`InstallationId`) REFERENCES `installation` (`InstallationId`) ON UPDATE CASCADE,
  CONSTRAINT `installizationoncomputer_ibfk_2` FOREIGN KEY (`ComputerPropertyNumber`) REFERENCES `computer` (`ComputerPropertyNumber`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `computersealling` (
  `ComputerSeallingId` int NOT NULL AUTO_INCREMENT,
  `ComputerSeallingNumber` int NOT NULL,
  `ComputerSeallingCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ComputerSeallingUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IsExpired` tinyint(1) DEFAULT '0',
  `ComputerPropertyNumber` int DEFAULT NULL,
  `UpdaterId` int DEFAULT NULL,
  `CreaterUserId` int NOT NULL,
  `UpdaterUserId` int DEFAULT NULL,
  `InternalRepairId` int DEFAULT NULL,
  PRIMARY KEY (`ComputerSeallingId`),
  UNIQUE KEY `ComputerSeallingNumber` (`ComputerSeallingNumber`),
  UNIQUE KEY `ComputerSeallingId` (`ComputerSeallingId`),
  KEY `computersealling_ibfk_1` (`ComputerPropertyNumber`),
  KEY `computersealling_ibfk_2` (`UpdaterId`),
  KEY `computersealling_ibfk_3` (`CreaterUserId`),
  KEY `computersealling_ibfk_4` (`UpdaterUserId`),
  KEY `computersealling_ibfk_5` (`InternalRepairId`),
  CONSTRAINT `computersealling_ibfk_1` FOREIGN KEY (`ComputerPropertyNumber`) REFERENCES `computer` (`ComputerPropertyNumber`) ON UPDATE CASCADE,
  CONSTRAINT `computersealling_ibfk_2` FOREIGN KEY (`UpdaterId`) REFERENCES `updater` (`UpdaterId`) ON UPDATE CASCADE,
  CONSTRAINT `computersealling_ibfk_3` FOREIGN KEY (`CreaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `computersealling_ibfk_4` FOREIGN KEY (`UpdaterUserId`) REFERENCES `user` (`UserId`) ON UPDATE CASCADE,
  CONSTRAINT `computersealling_ibfk_5` FOREIGN KEY (`InternalRepairId`) REFERENCES `internalrepair` (`InternalRepairId`) ON UPDATE CASCADE
);