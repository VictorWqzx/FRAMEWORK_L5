class ErrorHandler {
    static handle(err, res) {
      console.error('Server error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = ErrorHandler;
  