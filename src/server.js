const App = require('./core/app');
const app = new App();

// Middleware пример
app.use((req, res) => {
  console.log(`${req.method} ${req.url}`);
});

// Роуты
app.get('/', (req, res) => {
  res.send('Hello from custom framework!');
});

app.post('/data', (req, res) => {
  res.json({ received: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
