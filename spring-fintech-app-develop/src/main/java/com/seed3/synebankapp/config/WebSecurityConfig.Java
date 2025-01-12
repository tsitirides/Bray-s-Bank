package com.seed3.synebankapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for simplicity, adjust as needed
                .authorizeRequests()
                .antMatchers("/index.html", "/static/**").permitAll() // Allow access to your login page and static resources
                .anyRequest().authenticated() // Secure all other requests
                .and()
                .formLogin()
                .loginPage("/index.html") // Use your custom login page
                .permitAll() // Allow everyone to access the login page
                .and()
                .logout()
                .permitAll(); // Allow logout for all users
    }
}