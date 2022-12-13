let allFilmsList = [];

(async () => {
  const films = document.getElementById('films');
  const buyTicket = document.getElementById('buy-ticket');

  const url = 'http://localhost:3000/films';

  async function getNewItems() {
    let json;
    try {
      const res = await fetch(url);
      json = await res.json();

      allFilmsList = json;

      await renderMovies();
      await updateMovie(allFilmsList[0]);
    } catch (e) {
      console.error('Bad request');
    }
  }

  const template = (title, id) =>
    `<li class="film item"  id=${id}>${title}</li>`;

  async function updateMovie(movieObj) {
    const { poster, title, runtime, description, showtime, tickets_sold } =
      movieObj;

    document.getElementById('poster').src = poster;
    document.getElementById('title').innerHTML = title;
    document.getElementById('runtime').innerHTML = runtime;
    document.getElementById('film-info').innerHTML = description;
    document.getElementById('showtime').innerHTML = showtime;
    document.getElementById('ticket-num').innerHTML = tickets_sold;
  }

  async function decrementTicket(count, object) {
    const newObject = { ...object };
    newObject.tickets_sold - count;

    let tickets_left = object.tickets_sold - count;
// UPDATE JSON SERVER

    return tickets_left;
  }

  async function renderMovies() {
    let movieClicked,
      notClicked = [];
    const html = allFilmsList.map(({ title, id }) => template(title, id));

    films.innerHTML = html.join('\n');

    let listItems = document.querySelectorAll('.film');
    let count = 0;

    buyTicket.addEventListener('click', async (e) => {
      e.preventDefault();
      count++;

      let ticketNumber = document.getElementById('ticket-num');

      const currentMovieTitle = document.getElementById('title');
      let movie = allFilmsList.filter(
        (ele) => ele.title === currentMovieTitle.innerText
      )[0];

      ticketNumber.innerText = await decrementTicket(count, movie);

      if (ticketNumber.innerText === '0') {
        document.querySelector('button').disabled = true;
        document.querySelector('button').innerText = 'Sold Out';
      }
    });

    listItems.forEach((node) => {
      node.style.cursor = 'pointer';

      node.addEventListener('click', (e) => {
        movieClicked = allFilmsList.filter((ele) => ele.id === node.id);
        updateMovie(movieClicked[0]);
        notClicked = allFilmsList.filter((ele) => ele.id !== node.id);
        document.getElementById(`${movieClicked[0].id}`).style.opacity = 0.5;
        notClicked.forEach((item) => {
          document.getElementById(`${item.id}`).style.opacity = 1;
        });
      });
    });
  }


  await getNewItems();
})();