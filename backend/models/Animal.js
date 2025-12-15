const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: String,
  habitat: String,
  region: String,
  diet: String,
  status: String,
  desc: String,
  image: String,
  scientificName: String,
  size: String,
  lifespan: String,
  conservation: String,
  threats: String
}, { timestamps: true });

module.exports = mongoose.models.Animal || mongoose.model('Animal', AnimalSchema);
