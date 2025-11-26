# Multi-stage build for optimized production image

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source
COPY frontend/ ./

# Build frontend for production
RUN npm run build

# Stage 2: Build Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy backend source
COPY . ./

# Build backend
RUN dotnet publish -c Release -o out

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Install SQLite
RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

# Copy backend build
COPY --from=backend-build /app/out ./

# Copy frontend build to wwwroot
COPY --from=frontend-build /app/frontend/dist ./wwwroot

# Create directory for database
RUN mkdir -p /app/data

# Set environment variables
ENV ASPNETCORE_URLS=http://+:$PORT
ENV ASPNETCORE_ENVIRONMENT=Production

# Expose port (Railway will set PORT env var)
EXPOSE $PORT

# Run the application
ENTRYPOINT ["dotnet", "ReportProject.dll"]
