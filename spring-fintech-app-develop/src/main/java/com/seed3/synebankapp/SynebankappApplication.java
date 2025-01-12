package com.seed3.synebankapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The exclude attribute is used to exclude the DataSourceAutoConfiguration and
 * HibernateJpaAutoConfiguration classes from being loaded. You should
 * eventually remove this attribute once you have configured your own DataSource
 * and JPA settings and add them to the application.properties file.
 *
 * spring.datasource.url=jdbc:mysql://localhost:3306/[database_name]
 * spring.datasource.username=root spring.datasource.password=root
 * spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
 */
@SpringBootApplication
public class SynebankappApplication {

    /**
     * Entrypoint for the Synebank application
     *
     * @param args command-line arguments passed to the main method
     */
    public static void main(final String[] args) {
        SpringApplication.run(SynebankappApplication.class, args);

    }

}
