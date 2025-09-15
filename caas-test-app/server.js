const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'CaaS Test Application is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// API endpoint for application info
app.get('/api/info', (req, res) => {
  res.json({
    name: 'CaaS Test Application',
    version: '1.0.0',
    framework: 'RADFish',
    description: 'Simple containerized web application for CaaS testing',
    status: 'running'
  });
});

// Serve React app for all other routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CaaS Test Application is running on port ${PORT}`);
  console.log(`📱 RADFish framework initialized`);
  console.log(`🌐 Access the application at http://localhost:${PORT}`);
  console.log(`❤️  Health check available at http://localhost:${PORT}/health`);
});
