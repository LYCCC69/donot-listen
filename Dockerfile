FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY dl/pom.xml .
COPY dl/src ./src
RUN mvn package -DskipTests -q

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/donot-listen-1.0.0.jar app.jar
EXPOSE 8082
ENV SPRING_PROFILES_ACTIVE=dev \
    CORS_ALLOWED_ORIGINS=https://qianduan-alpha.vercel.app
ENTRYPOINT ["java", "-jar", "app.jar"]
