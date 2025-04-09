const fs = require('fs');
const path = require('path');

function readData() {
  const data = fs.readFileSync(path.join(__dirname, '../db/tourists.json'), 'utf-8');
  return JSON.parse(data);
}


// Получить всех туристов
exports.getAllTourists = (req, res) => {
  const tourists = readData();
  res.status(200).json(tourists);
};

// Получить туриста по ID
exports.getTouristById = (req, res) => {
  const tourists = readData();
  const tourist = tourists.find(t => t.id === parseInt(req.params.id));
  
  if (!tourist) {
    return res.status(404).json({ error: 'Tourist not found' });
  }
  
  res.status(200).json(tourist);
};

// Создать нового туриста
exports.createTourist = (req, res) => {
  const tourists = readData();
  const newTourist = {
    id: tourists.length + 1,
    ...req.body,
  };
  tourists.push(newTourist);
  
  fs.writeFileSync(touristsFilePath, JSON.stringify(tourists, null, 2));
  res.status(201).json(newTourist);
};

// Обновить туриста
exports.updateTourist = (req, res) => {
  const tourists = readData();
  const touristIndex = tourists.findIndex(t => t.id === parseInt(req.params.id));
  
  if (touristIndex === -1) {
    return res.status(404).json({ error: 'Tourist not found' });
  }
  
  const updatedTourist = {
    ...tourists[touristIndex],
    ...req.body,
  };
  tourists[touristIndex] = updatedTourist;
  
  fs.writeFileSync(touristsFilePath, JSON.stringify(tourists, null, 2));
  res.status(200).json(updatedTourist);
};

// Удалить туриста
exports.deleteTourist = (req, res) => {
  let tourists = readData();
  tourists = tourists.filter(t => t.id !== parseInt(req.params.id));
  
  fs.writeFileSync(touristsFilePath, JSON.stringify(tourists, null, 2));
  res.status(204).send();
};
