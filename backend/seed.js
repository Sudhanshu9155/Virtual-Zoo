require('dotenv').config();
const mongoose = require('mongoose');
const Animal = require('./models/Animal');
const QuizQuestion = require('./models/QuizQuestion');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/virtual-zoo';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  // Sample animals
  const animals =  [
  {
    id: '1',
    name: 'African Lion',
    category: 'MAMMAL',
    habitat: 'Savannas and grasslands',
    region: 'Sub-Saharan Africa',
    diet: 'Carnivore',
    status: 'Vulnerable',
    desc: 'The lion is known as the king of the jungle, though they primarily inhabit savannas and grasslands.',
    image: 'https://images.unsplash.com/photo-1562552476-8acad031e6d6?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Panthera leo',
    size: '4.5-6.5 feet',
    lifespan: '10-14 years in wild',
    conservation: 'Habitat loss and human conflict',
    threats: 'Human-wildlife conflict, habitat loss'
  },

  {
    id: '2',
    name: 'Black spotted newt',
    category: 'AMPHIBIAN',
    habitat: 'Ponds and marshes',
    region: 'Southern Texas and Mexico',
    diet: 'Carnivore',
    status: 'Vulnerable',
    desc: 'Usually unnoticed by people, Black-spotted Newts are the only species of newts found in the ponds and marshes of southern Texas and Mexico.',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b800f9f7?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Notophthalmus meridionalis',
    size: '2.5-3.5 inches',
    lifespan: '10-15 years',
    conservation: 'Habitat loss and pollution',
    threats: 'Pollution, habitat destruction'
  },

  {
    id: '3',
    name: 'Bengal Tiger',
    category: 'MAMMAL',
    habitat: 'Tropical rainforests, grasslands',
    region: 'India, Bangladesh, Nepal',
    diet: 'Carnivore',
    status: 'Endangered',
    desc: 'Bengal tigers are powerful apex predators known for their stunning orange coats with black stripes.',
    image: 'https://images.unsplash.com/photo-1597843786271-f96c7f7d99a9?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Panthera tigris tigris',
    size: '8-10 feet',
    lifespan: '8-10 years in wild',
    conservation: 'Poaching prevention and habitat protection',
    threats: 'Poaching, habitat fragmentation'
  },

  {
    id: '4',
    name: 'African Elephant',
    category: 'MAMMAL',
    habitat: 'Savannas, forests',
    region: 'Sub-Saharan Africa',
    diet: 'Herbivore',
    status: 'Vulnerable',
    desc: 'The African elephant is the world’s largest land animal, known for its intelligence and close family bonds.',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Loxodonta africana',
    size: '8-13 feet tall',
    lifespan: '60-70 years',
    conservation: 'Anti-poaching efforts, habitat protection',
    threats: 'Poaching, habitat loss'
  },

  {
    id: '5',
    name: 'Bald Eagle',
    category: 'BIRD',
    habitat: 'Forests, lakes, rivers',
    region: 'North America',
    diet: 'Carnivore (mainly fish)',
    status: 'Least Concern',
    desc: 'The bald eagle is a symbol of strength and freedom, known for its striking white head and tail.',
    image: 'https://images.unsplash.com/photo-1585683733653-1b7e4935d4e4?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Haliaeetus leucocephalus',
    size: '28-40 inches',
    lifespan: '20-30 years',
    conservation: 'Protected under conservation laws',
    threats: 'Habitat destruction, pollution'
  },

  {
    id: '6',
    name: 'Scarlet Macaw',
    category: 'BIRD',
    habitat: 'Tropical rainforests',
    region: 'Central and South America',
    diet: 'Fruits, nuts, seeds',
    status: 'Least Concern',
    desc: 'Scarlet macaws are vibrant parrots known for their intelligence and colorful plumage.',
    image: 'https://images.unsplash.com/photo-1501703979959-797917eb21c8?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Ara macao',
    size: '32 inches',
    lifespan: '40-50 years',
    conservation: 'Reintroduction programs',
    threats: 'Illegal pet trade, deforestation'
  },

  {
    id: '7',
    name: 'Green Iguana',
    category: 'REPTILE',
    habitat: 'Rainforests, near water',
    region: 'Central and South America',
    diet: 'Herbivore',
    status: 'Least Concern',
    desc: 'Green iguanas are tree-dwelling lizards known for their impressive size and agility.',
    image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Iguana iguana',
    size: '5-7 feet',
    lifespan: '15-20 years',
    conservation: 'Minimal conservation efforts',
    threats: 'Habitat loss'
  },

  {
    id: '8',
    name: 'King Cobra',
    category: 'REPTILE',
    habitat: 'Forests, bamboo thickets',
    region: 'India, Southeast Asia',
    diet: 'Carnivore (snakes)',
    status: 'Vulnerable',
    desc: 'The king cobra is the world’s longest venomous snake and a highly respected predator.',
    image: 'https://images.unsplash.com/photo-1585060544816-cc6ec1cbf38c?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Ophiophagus hannah',
    size: '10-18 feet',
    lifespan: '20 years',
    conservation: 'Habitat protection',
    threats: 'Deforestation, hunting'
  },

  {
    id: '9',
    name: 'Poison Dart Frog',
    category: 'AMPHIBIAN',
    habitat: 'Rainforests',
    region: 'Central and South America',
    diet: 'Insects',
    status: 'Least Concern',
    desc: 'These brightly colored frogs are famous for their toxic skin secretions.',
    image: 'https://images.unsplash.com/photo-1610758024726-f7e5b1e3c00c?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Dendrobatidae',
    size: '1 inch',
    lifespan: '5-7 years',
    conservation: 'Captive breeding programs',
    threats: 'Habitat destruction'
  },

  {
    id: '10',
    name: 'Clownfish',
    category: 'FISH',
    habitat: 'Coral reefs',
    region: 'Indian and Pacific Oceans',
    diet: 'Plankton, algae',
    status: 'Least Concern',
    desc: 'Clownfish form symbiotic relationships with sea anemones and are well-known from "Finding Nemo".',
    image: 'https://images.unsplash.com/photo-1544551763-cede89e5a0d2?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Amphiprioninae',
    size: '4 inches',
    lifespan: '6-10 years',
    conservation: 'Marine habitat protection',
    threats: 'Coral bleaching'
  },

  {
    id: '11',
    name: 'Monarch Butterfly',
    category: 'INSECT',
    habitat: 'Meadows, gardens',
    region: 'North America',
    diet: 'Nectar',
    status: 'Endangered',
    desc: 'Monarch butterflies are known for their long-distance migration patterns.',
    image: 'https://images.unsplash.com/photo-1508264165352-258a6a2a5c9b?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Danaus plexippus',
    size: '3.5–4 inches',
    lifespan: '6-8 months',
    conservation: 'Milkweed restoration',
    threats: 'Habitat loss, pesticides'
  },

  {
    id: '12',
    name: 'Leafcutter Ant',
    category: 'INSECT',
    habitat: 'Tropical forests',
    region: 'Central & South America',
    diet: 'Fungus they cultivate',
    status: 'Least Concern',
    desc: 'Leafcutter ants cut leaves to grow fungus, their primary food source.',
    image: 'https://images.unsplash.com/photo-1552845108-5f4b55e311e0?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Atta cephalotes',
    size: '0.3 inches',
    lifespan: 'Several months',
    conservation: 'No major programs',
    threats: 'Habitat loss'
  }
];


  // Sample quiz
  const quiz = [
    { id: 'q1', question: 'Which bird mimics human speech?', options: ['Sparrow','Parrot','Eagle','Penguin'], correctAnswer: 'Parrot' },
    { id: 'q2', question: 'What is the primary diet of a panda?', options: ['Bamboo','Fish','Insects','Grass'], correctAnswer: 'Bamboo' }
  ];

  // Upsert animals
  for (const a of animals) {
    await Animal.updateOne({ id: a.id }, { $set: a }, { upsert: true });
  }

  // Upsert quiz
  for (const q of quiz) {
    await QuizQuestion.updateOne({ id: q.id }, { $set: q }, { upsert: true });
  }

  console.log('Seeding complete');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed', err);
  process.exit(1);
});
