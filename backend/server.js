const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Root@123',
  database: process.env.DB_NAME || 'tech_expert_db'
});

db.connect(err => {
  if (err) console.error(err);
  else console.log('✅ MySQL Connected');
});

// Create tables
db.query(`CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  course VARCHAR(50),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

app.post('/signup', async (req, res) => {
  const { name, email, phone, course, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  
  db.query('INSERT INTO students (name, email, phone, course, password) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, course, hashed], (err) => {
      if (err) return res.status(400).json({ message: 'Email already exists!' });
      res.json({ message: 'Signup Successful!' });
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM students WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });
    
    const match = await bcrypt.compare(password, results[0].password);
    if (match) res.json({ message: 'Login Successful!', user: results[0] });
    else res.status(400).json({ message: 'Wrong password' });
  });
});

app.get('/students', (req, res) => {
  db.query('SELECT id, name, email, phone, course, created_at FROM students', (err, results) => {
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
