FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8082
ENV SPRING_PROFILES_ACTIVE=prod \
    DB_HOST=your-db-host \
    DB_NAME=donotlisten \
    DB_USERNAME=your-db-user \
    DB_PASSWORD=your-db-password \
    JWT_SECRET=change-this-to-a-random-secret \
    CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
ENTRYPOINT ["java", "-jar", "app.jar"]
