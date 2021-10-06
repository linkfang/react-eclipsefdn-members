DROP TABLE IF EXISTS Address, FormWorkingGroup, Contact, FormOrganization, MembershipForm CASCADE;
CREATE TABLE `MembershipForm` (
  `id` varchar(255) NOT NULL,
  `dateCreated` bigint(20) DEFAULT NULL,
  `dateUpdated` bigint(20) DEFAULT NULL,
  `dateSubmitted` bigint(20) DEFAULT NULL,
  `membershipLevel` varchar(255) DEFAULT NULL,
  `purchaseOrderRequired` varchar(255) DEFAULT NULL,
  `registrationCountry` varchar(255) DEFAULT NULL,
  `signingAuthority` bit(1) NOT NULL,
  `userID` varchar(255) DEFAULT NULL,
  `vatNumber` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Contact` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fName` varchar(255) DEFAULT NULL,
  `lName` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `form_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2g2hji3xsvakv5blqilnol5ad` (`form_id`),
  CONSTRAINT `FK2g2hji3xsvakv5blqilnol5ad` FOREIGN KEY (`form_id`) REFERENCES `MembershipForm` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `FormOrganization` (
  `id` varchar(255) NOT NULL,
  `legalName` varchar(255) DEFAULT NULL,
  `twitterHandle` varchar(255) DEFAULT NULL,
  `aggregateRevenue` varchar(255) DEFAULT NULL,
  `organizationType` varchar(255) DEFAULT NULL,
  `employeeCount` varchar(255) DEFAULT NULL,
  `form_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_27vg3uhbmy3ev7ote4fjd4evl` (`form_id`),
  CONSTRAINT `FKib65ho89l5rvfgqql7wq15oxv` FOREIGN KEY (`form_id`) REFERENCES `MembershipForm` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `FormWorkingGroup` (
  `id` varchar(255) NOT NULL,
  `effectiveDate` datetime(6) DEFAULT NULL,
  `participationLevel` varchar(255) DEFAULT NULL,
  `workingGroupID` varchar(255) DEFAULT NULL,
  `contact_id` varchar(255) DEFAULT NULL,
  `form_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1gt3qh8yu1jpky54o38igvfrq` (`contact_id`),
  KEY `UK_2qrha8ti59jcxnvi2h8b9d2u8` (`form_id`),
  CONSTRAINT `FK8mhoi37sufequy7nnn19811rv` FOREIGN KEY (`form_id`) REFERENCES `MembershipForm` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKmnoygtwlsvh31vb4volo8odct` FOREIGN KEY (`contact_id`) REFERENCES `Contact` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Address` (
  `id` varchar(255) NOT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `administrativeArea` varchar(255) DEFAULT NULL,
  `addressLine1` varchar(255) DEFAULT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `organization_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_i4vgutrsl3ve37hc8xx7vvslf` (`organization_id`),
  CONSTRAINT `FKok1ylu26qjwvmfwgxlllbkj8l` FOREIGN KEY (`organization_id`) REFERENCES `FormOrganization` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
