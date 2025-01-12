# Spring-Fintech-App


## Installation Requirements

- [ ] Java JDK version 21
- [ ] Node.js version 20.18.0
- [ ] Maven version 3.9.9 (set it up in your system environment variables)
- [ ] Yarn version 1.22.22
- [ ] MySQL version 8.0
- [ ] (Optional) MySQL Workbench
- [ ] IDE Recommendation: VSCode

## How to run program

1. 
- Build and install the frontend:
```
cd src/main/frontend 
yarn install 
yarn run build 
yarn start
```
- Open your browser and enter the following URL: [http://localhost:3000/](http://localhost:3000/).
- If the login page appears, stop the program and proceed to the next step.

2. 
- Return to the project root directory and enter in the terminal:
```
cd ../../..
mvn clean install
mvn spring-boot:run
```
- Once spring boot is running, open your browser and enter: [http://localhost:8080/](http://localhost:8080/)

## Common Issues

1. Maven Extension in VS code

- If you are trying to run the program with the maven extension you may run into an issue with yarn and node.

    ### Solution
    - Run with maven installed on your local machine

2. `spring-boot:run` issues

- If you are experiencing errors with `mvn spring-boot:run`, ensure your database is set up correctly and you have run the script `synebank 1.sql` which can be found in the Javaspring Project Teams channel.

## Description
Clone of tangerine online banking platform, simplifies banking for the next genereation eliminating going directly to the bank to perform simple banking tasks.
