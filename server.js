const express = require('express');
const db = require('./db');
const { success, failure } = require('./helpers/response');

const app = express();
const PORT = 3000;

app.use(express.json());

// Validation helper
function validateBook(body) {
  const { title, author, year } = body;

  if (!title || !author || !year) {
    return 'title, author, and year are required';
  }

  if (typeof year !== 'number') {
    return 'year must be a number';
  }

  if (year < 1000 || year > 2100) {
    return 'year must be between 1000 and 2100';
  }

  return null;
}

// POST /books - Create
app.post('/books', (req, res) => {
  const err = validateBook(req.body);

  if (err) {
    return res.status(400).json(failure(err));
  }

  try {
    const { title, author, year } = req.body;

    const result = db.prepare(
      'INSERT INTO books (title, author, year) VALUES (?, ?, ?)'
    ).run(title, author, year);

    res.status(201).json(
      success({
        id: result.lastInsertRowid,
        title,
        author,
        year
      })
    );
  } catch (e) {
    res.status(500).json(failure('Database error', 500));
  }
});

// GET /books - Read All
app.get('/books', (req, res) => {
  const books = db.prepare('SELECT * FROM books').all();

  res.json(success(books));
});

// GET /books/:id - Read One
app.get('/books/:id', (req, res) => {
  const book = db
    .prepare('SELECT * FROM books WHERE id = ?')
    .get(req.params.id);

  if (!book) {
    return res.status(404).json(failure('Book not found', 404));
  }

  res.json(success(book));
});

// PUT /books/:id - Update
app.put('/books/:id', (req, res) => {
  const err = validateBook(req.body);

  if (err) {
    return res.status(400).json(failure(err));
  }

  const { title, author, year } = req.body;

  db.prepare(
    'UPDATE books SET title=?, author=?, year=? WHERE id=?'
  ).run(title, author, year, req.params.id);

  res.json(success({ updated: true }));
});

// DELETE /books/:id - Delete
app.delete('/books/:id', (req, res) => {
  db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);

  res.json(success({ deleted: true }));
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);