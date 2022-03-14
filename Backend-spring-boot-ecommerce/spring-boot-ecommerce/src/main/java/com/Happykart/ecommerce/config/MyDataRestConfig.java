package com.Happykart.ecommerce.config;

import com.Happykart.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;


    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager=theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsupportedActions ={HttpMethod.PUT, HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PATCH};


        //disable HTTP methods for Product: PUT, POST and DELETE
        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(Product.class), theUnsupportedActions);

        //disable HTTP methods for ProductCategory: PUT, POST and DELETE
        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(ProductCategory.class), theUnsupportedActions);

        //disable HTTP methods for Country: PUT, POST and DELETE
        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(Country.class), theUnsupportedActions);

        //disable HTTP methods for State: PUT, POST and DELETE
        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(State.class), theUnsupportedActions);

        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(Order.class), theUnsupportedActions);

        //call an internal helper method
        exposeIds(config);

    cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllowedOrigins);

    }

    private void disableHttpMethods(ExposureConfigurer config, HttpMethod[] theUnsupportedActions) {
        config
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();

        System.out.println(entities);
        // - Create an array of the entity tyoe
        List<Class> entityClasses=new ArrayList<>();

        // - get the entity types for the entities
        for(EntityType tempEntityType:entities){
            entityClasses.add(tempEntityType.getJavaType());
        }

        System.out.println(entityClasses);
        // - expose the entity ids for the arrya of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
        System.out.println(domainTypes);
    }
}
