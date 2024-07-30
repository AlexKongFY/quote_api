// import libraries from express
const express = require('express');
// const morgan = require('morgan'); 
const app = express(); // launch express app

// import quotes array from data.js and utility functions from local modules
const { quotes } = require('./data');
const { getRandomElement, searchByAuthor } = require('./utils');

// define port listener
const PORT = process.env.PORT || 4001;

// Middleware to parse JSON bodies in requests
app.use(express.json());
// Middleware for static files in public directory
app.use(express.static('public'));


// Q2 & Q5 function for finding quotes relating to author or all quotes
function getAll (req, res) {
  // person in array as variable 
  const { person } = req.query;
  // check if person exists and log result 
  if (person) {
    const outcome = searchByAuthor(quotes, person);
    res.json({quotes: outcome});
  } else {
    // Q5 get all quotes as person not existed
    const allQuotes = quotes.map((element, index) => ({
      id: index + 1,
      quote: element.quote,
      person: element.person
    }));
    res.json({quotes: allQuotes})
  }
};

// Q2 & Q4 function for random quote
function getRandomQuote(req, res) {
  // random quote as variable
  const randomQuote = getRandomElement(quotes);
  res.json({ quote: randomQuote });
};


// Q6 add new quotes and author
function postNewQuote(req, res) {
  // variable to store new quote and person
  const newQuote = req.body.quote;
  const newAuthor = req.body.person;
  // check each quote must have a quote or author name
  if (!newQuote || !newAuthor)  {
    res.status(400).send({ message: "A quote and A person name needed for query." });
  } else {
    // if requirements met
    const newEntry = { quote: newQuote, person: newAuthor };
    quotes.push(newEntry);
    res.status(201).send({ quote: newEntry });
  } 
};


// Q8 - update quote with PUT method
function updateQuote(req,res) {
  // need id to check
  const { id } = req.params;
  const index = parseInt(id) - 1;
  const { quote, person } = req.body;
  // check if index exist and valid
  if (index >= 0 && index < quotes.length) {
    // check if quote and person key in by user
    if (!quote && !person) {
      res.status(404).send({ message: "A quote and A person name needed for query." });
    } else {
      // check updated contents valid in array and output 
      if (quote) { quotes[index].quote = quote };
      if (person) { quotes[index].person = person };
      res.status(200).send({ quote: quotes[index] })
    }
    // output error if index is not found 
  } else {
    res.status(404).send({ message: "Not such quote found." });
  }
};


// Q8 - Delete a quote with DELETE method
function deleteQuote(req, res) {
   // need id to check
   const { id } = req.params;
   const index = parseInt(id) - 1;
   // check if index exist
   if (index !== -1) {
    quotes.splice(index, 1);
    res.status(200).send()
   } else {
    res.status(404).send({ message: "Not such quote found." });
   }
};


// Define the routes for server
app.get('/api/quotes', getAll); // get specific quote or all quotes
app.get('/api/quotes/random', getRandomQuote); // get random quote
app.post('/api/quotes', postNewQuote); // add new quote
app.put('/api/quotes/:id', updateQuote); // update a quote
app.delete('/api/quotes/:id', deleteQuote); // delete a quote




// Q3 port listener
app.listen(PORT, () => {
  console.log(`Server listens on ${PORT}.`);
})