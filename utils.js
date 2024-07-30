const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

// add function to search by author
const searchByAuthor = (quotes, person) => {
  // search if author name search in lowercase to match array list of author names
  return quotes.filter(quote => quote.person.toLowerCase() === person.toLowerCase());
}

module.exports = {
  getRandomElement,
  searchByAuthor
};
