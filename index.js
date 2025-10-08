require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { connectDB } = require('./src/db/db.js');
const errorHandler = require('./src/utils/errorHandler');

// Routes
const amazonMailRoutes = require('./src/routes/amazonMail.routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use('/api/v1/emails',amazonMailRoutes );

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint [${req.method}] ${req.originalUrl} not found`,
  });
});

// Global Error Handler 
app.use(errorHandler);

// Start Server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();


module.exports = app;



