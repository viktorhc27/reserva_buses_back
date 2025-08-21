const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  if (process.env.NODE_ENV !== 'test') {
    console.error(`[${new Date().toISOString()}]`, err);
  }

  res.status(status).json({
    error: {
      message: err.message || 'Error interno del servidor',
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};
module.exports = errorHandler;
