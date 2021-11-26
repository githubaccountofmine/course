window.onscroll = function() {scrollSpy()};

function scrollSpy() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("ranger").value = scrolled;
}



function getCat(target) {
    fetch('https://aws.random.cat/meow')
    .then(res => res.json())
    .then(data => {
        target.innerHTML = `<img class="image" src=${data.file}>`
    })
}

const imgs = document.querySelectorAll(".placeholder");

function createObserver() {
    let observer;
  
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    };
  
    observer = new IntersectionObserver(handleIntersect, options);
    for (let el of imgs) {
        observer.observe(el);   
    }

    function handleIntersect(entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.childElementCount === 0) {
              getCat(entry.target)
          }
        });
      }
  }

window.addEventListener("load", (event) => {
    createObserver();
}, false);

// function showMore(id) {
//     debugger;
//     const curr = document.querySelector('.currentbeer');
//     curr.innerHTML = beersInfo[id];
// }

async function getBeers() {
    try {
      const promises = [];
      for (let i = 0; i < 10; i++) {
          promises.push({});
      }
      let beersInfo = []
      const beers = document.querySelector('.beers');
      const proms = promises.map(() => fetch('https://api.punkapi.com/v2/beers/random'))
      await Promise.all(proms)
      .then(responses => {
        for(let response of responses) {
          response.json().then(data => beersInfo.push(data));
        }
        for (let i = 0; i < beersInfo.length; i++) {
            const beer = document.createElement('div');
            beer.classList.add('beer__wrapper');
            beer.id = i
            const image = document.createElement('img');
            image.src = beersInfo[i].image_url
            image.classList.add('beer__image');
            beer.onclick = showMore(i);
            beers.appendChild(beer);
          }
      })

    //   // map array of responses into an array of response.json() to read their content
    //   .then(responses => Promise.all(responses.map(r => r.json())))
    //   // all JSON answers are parsed: "users" is the array of them
    //   .then(users => users.forEach(user => alert(user.name)));



    //   const beer1 = document.createElement('div');
    //   const beer2 = document.createElement('div');
    //   const beer3 = document.createElement('div');

    //   let beerInfo1 = {};
    //   let beerInfo2 = {};
    //   let beerInfo3 = {};

    //   await data1.json().then(data => beerInfo1 = data[0])
    //   await data2.json().then(data => beerInfo2 = data[0])
    //   await data3.json().then(data => beerInfo3 = data[0])

    //   beer1.innerHTML = `<img class="beer-image" src=${beerInfo1.image_url}>`
    //   beer2.innerHTML = `<img class="beer-image" src=${beerInfo2.image_url}>`
    //   beer3.innerHTML = `<img class="beer-image" src=${beerInfo3.image_url}>`

    //   beer1.addEventListener('click', console.log(beerInfo1))
    //   beer2.addEventListener('click', console.log(beerInfo2))
    //   beer3.addEventListener('click', console.log(beerInfo3))

    //   beers.appendChild(beer1);
    //   beers.appendChild(beer2);
    //   beers.appendChild(beer3);
    } catch (err) {
      console.log(err);
    }
  }