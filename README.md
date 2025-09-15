# CaaS Test Application

A simple containerized web application built with the RADFish framework for testing Container-as-a-Service (CaaS) deployment on Google Cloud.

## Overview

This application demonstrates:
- **RADFish Framework**: React-based framework for NOAA web applications
- **Progressive Web App (PWA)**: Offline-capable web application
- **US Web Design System (USWDS)**: Federal design standards compliance
- **Containerization**: Docker-based deployment
- **Kubernetes**: Production-ready orchestration

## Application Features

- Simple homepage displaying "My CaaS Test Application is Running!"
- Health check endpoint at `/health`
- Application info API at `/api/info`
- Responsive design with USWDS styling
- PWA capabilities for offline functionality

## Local Development

### Prerequisites
- Node.js v20+
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run production server locally
npm run serve:prod
```

The application will be available at `http://localhost:3000` (development) or `http://localhost:8080` (production).

## Docker Deployment

### Build Docker Image
```bash
# Build the Docker image
docker build -t caas-test-app .

# Run the container
docker run -p 8080:8080 caas-test-app
```

### Google Artifact Registry

#### Build and Push to Artifact Registry
```bash
# Configure Docker for Artifact Registry
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build and tag the image
docker build -t us-central1-docker.pkg.dev/caas-test-project/caas-test-repo/caas-test-app:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/caas-test-project/caas-test-repo/caas-test-app:latest
```

**Note**: This example uses `caas-test-project` as the project ID and `caas-test-repo` as the repository name. Replace these with your actual Google Cloud project ID and Artifact Registry repository name if different.

## Kubernetes Deployment

### Prerequisites
- kubectl configured for your cluster
- Docker image pushed to Google Artifact Registry

### Deploy to Kubernetes
```bash
# The image path in deployment.yaml has been configured to use:
# us-central1-docker.pkg.dev/caas-test-project/caas-test-repo/caas-test-app:latest
# Update this if you're using different project ID or repository name

# Apply the deployment
kubectl apply -f deployment.yaml

# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services

# Port forward to access the application locally
kubectl port-forward service/caas-test-app-service 8080:80
```

### Deployment Configuration

The Kubernetes deployment includes:
- **2 replicas** for high availability
- **Resource limits**: 256Mi memory, 200m CPU
- **Health checks**: Liveness and readiness probes
- **Security**: Non-root user, security contexts
- **Service**: ClusterIP service for internal access

## Endpoints

- `/` - Main application homepage
- `/health` - Health check endpoint (returns JSON status)
- `/api/info` - Application information API

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Express.js     │    │   Docker        │
│   (RADFish)     │───▶│   Server         │───▶│   Container     │
│   - USWDS       │    │   - Static files │    │   - Node.js 20  │
│   - PWA         │    │   - Health check │    │   - Port 8080   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Kubernetes    │
                                               │   - 2 replicas  │
                                               │   - Service     │
                                               │   - Probes      │
                                               └─────────────────┘
```

## Network Configuration

- **Internal Access**: Application configured for internal network access only
- **Port**: 8080 (container and service)
- **Protocol**: HTTP
- **Service Type**: ClusterIP (internal cluster access)

## Monitoring

The application includes built-in health monitoring:
- **Health Check**: `GET /health`
- **Kubernetes Probes**: Liveness and readiness checks
- **Docker Health Check**: Container-level health monitoring

## Security Features

- Non-root user execution (UID 1001)
- Security contexts in Kubernetes
- Read-only root filesystem considerations
- Resource limits and requests

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Container Issues**
   ```bash
   # Check container logs
   docker logs <container-id>
   
   # Debug container
   docker run -it caas-test-app sh
   ```

3. **Kubernetes Issues**
   ```bash
   # Check pod logs
   kubectl logs -l app=caas-test-app
   
   # Describe deployment
   kubectl describe deployment caas-test-app
   
   # Check events
   kubectl get events --sort-by=.metadata.creationTimestamp
   ```

## Development Team

This application was created for NOAA's Container-as-a-Service (CaaS) testing initiative using the RADFish framework.

## License

This project follows NOAA's open source guidelines and disclaimer requirements.
