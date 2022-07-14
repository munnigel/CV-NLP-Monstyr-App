FROM maven:3.6.3-openjdk-11-slim as builder

WORKDIR /app 
#create directory in /app on cloud 
COPY pom.xml .
# Use this optimization to cache the local dependencies. Works as long as the POM doesn't change
RUN mvn dependency:go-offline

COPY src/ /app/src/
#mvn package create classes -> cos its a compiler
RUN mvn package

# Use AdoptOpenJDK for base image.
FROM adoptopenjdk/openjdk11:latest

# Copy the jar to the production image from the builder stage.
COPY --from=builder /app/target/*.jar /app.jar

# Run the web service on container startup.
CMD ["java", "-jar", "/app.jar"]