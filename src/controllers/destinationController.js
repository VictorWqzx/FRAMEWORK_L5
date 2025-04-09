const fs = require('fs');
const path = require('path');

// Путь к файлу с направлениями
const destinationsFilePath = path.join(__dirname, '../db/destinations.json');

// Функция для чтения данных из JSON файла
const readData = () => {
  const data = fs.readFileSync(destinationsFilePath, 'utf8');
  return JSON.parse(data);
};

// Получить все направления
exports.getAllDestinations = (req, res) => {
  const destinations = readData();
  res.status(200).json(destinations);
};

// Получить направление по ID
exports.getDestinationById = (req, res) => {
  const destinations = readData();
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  
  if (!destination) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  
  res.status(200).json(destination);
};

// Создать новое направление
exports.createDestination = (req, res) => {
  const destinations = readData();
  const newDestination = {
    id: destinations.length + 1,
    ...req.body,
  };
  destinations.push(newDestination);
  
  fs.writeFileSync(destinationsFilePath, JSON.stringify(destinations, null, 2));
  res.status(201).json(newDestination);
};

// Обновить направление
exports.updateDestination = (req, res) => {
  const destinations = readData();
  const destinationIndex = destinations.findIndex(d => d.id === parseInt(req.params.id));
  
  if (destinationIndex === -1) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  
  const updatedDestination = {
    ...destinations[destinationIndex],
    ...req.body,
  };
  destinations[destinationIndex] = updatedDestination;
  
  fs.writeFileSync(destinationsFilePath, JSON.stringify(destinations, null, 2));
  res.status(200).json(updatedDestination);
};

// Удалить направление
exports.deleteDestination = (req, res) => {
  let destinations = readData();
  destinations = destinations.filter(d => d.id !== parseInt(req.params.id));
  
  fs.writeFileSync(destinationsFilePath, JSON.stringify(destinations, null, 2));
  res.status(204).send();
};
