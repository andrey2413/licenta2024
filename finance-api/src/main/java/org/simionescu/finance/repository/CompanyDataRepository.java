package org.simionescu.finance.repository;

import org.simionescu.finance.model.CompanyData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "companyData", path = "company-data")
public interface CompanyDataRepository extends MongoRepository<CompanyData, String> {
}
