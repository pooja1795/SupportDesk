FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY target/ticket-service-1.0.0.jar app.jar
EXPOSE 9002
ENTRYPOINT ["java","-jar","app.jar"]
