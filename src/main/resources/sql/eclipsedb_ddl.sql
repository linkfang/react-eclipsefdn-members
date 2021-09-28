DROP TABLE IF EXISTS OrganizationProducts, OrganizationContacts, OrganizationInformation, OrganizationTokens CASCADE;
-- eclipse.OrganizationContacts definition

CREATE TABLE `OrganizationContacts` (
  `OrganizationID` int(10) unsigned NOT NULL DEFAULT 0,
  `PersonID` varchar(20) NOT NULL DEFAULT '',
  `Relation` varchar(5) NOT NULL DEFAULT '',
  `Comments` text DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`OrganizationID`,`PersonID`,`Relation`),
  KEY `PersonID` (`PersonID`),
  KEY `Relation` (`Relation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- eclipse.OrganizationInformation definition

CREATE TABLE `OrganizationInformation` (
  `OrganizationID` int(11) NOT NULL,
  `short_description` varchar(512) DEFAULT NULL,
  `long_description` mediumtext DEFAULT NULL,
  `company_url` mediumtext NOT NULL,
  `small_mime` varchar(32) DEFAULT NULL,
  `small_logo` blob DEFAULT NULL,
  `small_width` smallint(5) unsigned NOT NULL,
  `small_height` smallint(5) unsigned NOT NULL,
  `large_mime` varchar(32) DEFAULT NULL,
  `large_logo` blob DEFAULT NULL,
  `large_width` smallint(5) unsigned NOT NULL,
  `large_height` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`OrganizationID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- eclipse.OrganizationProducts definition

CREATE TABLE `OrganizationProducts` (
  `ProductID` int(11) NOT NULL AUTO_INCREMENT,
  `OrganizationID` int(11) DEFAULT NULL,
  `name` varchar(256) NOT NULL,
  `description` text DEFAULT NULL,
  `product_url` varchar(512) NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `FK_OrganizationID` (`OrganizationID`)
) ENGINE=MyISAM AUTO_INCREMENT=259 DEFAULT CHARSET=latin1;


-- eclipse.OrganizationTokens definition

CREATE TABLE `OrganizationTokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OrganizationID` int(11) DEFAULT NULL,
  `Token` blob DEFAULT NULL,
  `Email` varchar(200) DEFAULT NULL,
  `ValidUntil` datetime DEFAULT NULL,
  `Subnet` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=700 DEFAULT CHARSET=latin1;