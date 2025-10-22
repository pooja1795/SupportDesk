FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
ARG JAR_FILE=target/auth-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
