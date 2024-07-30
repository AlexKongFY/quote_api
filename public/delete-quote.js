// delete quote script
const deleteButton = document.getElementById('delete-quote');
const newQuoteContainer = document.getElementById('new-quote');

// listen click to delete specific quote by id
deleteButton.addEventListener('click', () =>
{
  const id = document.getElementById('id').value
  fetch(`/api/quotes/${id}`, {
    method: 'DELETE',
  })
  .then((response) =>
  {
    // if delete is success and output
    console.log(response);
    if (response.ok)
    {
      const newQuote = document.createElement('div');
      newQuote.innerHTML = `
    <h3>Congrats, the quote has deleted!</h3>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
        // output the delete message in html
        newQuoteContainer.appendChild(newQuote);
    }
  })
});