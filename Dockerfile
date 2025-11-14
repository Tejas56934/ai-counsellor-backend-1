# Use official Java 17 image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Give permissions and build the jar
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Expose Spring Boot default port
EXPOSE 8080

# Start the application
CMD ["java", "-jar", "target/AICounsellor-0.0.1-SNAPSHOT.jar"]
