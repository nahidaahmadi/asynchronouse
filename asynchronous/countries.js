"use strict";
const btn = document.querySelector(".btn-country");

const countriesContainer = document.querySelector(".countries");
//"https://countries-api-836d.onrender.com/countries/name/Canada"

const renderHtml = function (data, className = "") {
  //special class properities for neighbour class
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${
            data.name === "Afghanistan" ? "Afghanistan.avif" : data.flag
          }" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              data.name === "Afghanistan"
                ? data.languages[0].name + " and Dari "
                : data.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
     `;

  countriesContainer.insertAdjacentHTML("beforeend", html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //countriesContainer.style.opacity = 1;
};

/*
function getCountry(country) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  ); //kinda like create the request
  request.send(); //send it
  request.addEventListener("load", function () {
    console.log(this.responseText); //in jason
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //GOT THİS CODE AND ADDED TO A FUNCTION CAUSE ITS REUSABLE
    const html = `
  <article class="country">
          <img class="country__img" src="${
            data.name === "Afghanistan" ? "Afghanistan.avif" : data.flag
          }" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              data.name === "Afghanistan"
                ? data.languages[0].name + " and Dari "
                : data.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
     `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
}
//in paralel--the order may change as you load the page--sends the request for the first onee and moves to the second one!!
getCountry("Canada");
getCountry("Turkey");
getCountry("Afghanistan");
*/
/*
//AJAX calls in this function happens in order cause the neighbour country is dependent on the firdt one as we need border code
function getCountryAndNeighbour(country) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  ); //kinda like create the request
  request.send(); //send it
  //nested callbacks
  request.addEventListener("load", function () {
    console.log(this.responseText); //in jason
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderHtml(data);
    const neighbour = data.borders?.[0];
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(request2.responseText);
      console.log(data2);
      renderHtml(data2, "neighbour");
    });
  });
}
getCountryAndNeighbour("Canada");

//callback hell--ex
setTimeout(() => {
  console.log("1 second");
  setTimeout(() => {
    console.log("2 second");
    setTimeout(() => {
      console.log("3 second");
      setTimeout(() => {
        console.log("4 second");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//fetch api--promise-object that is aplceholder of the future result of asynchronous operations
function getCountry(country) {
  const request = fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderHtml(data[0]);
    }); //json is asynchronous too,returns a promise-then
}*/
function getJson(url, msg = "Something went wrong") {
  return fetch(url).then((reponse) => {
    if (!reponse.ok) {
      console.log(reponse); //reject manually
      throw new Error(`${msg} (${reponse.status})`);
    } //means the status or the reason of the error
    //if response=false--not found
    return reponse.json();
  });
}
/*
//FETCH--AJAX--chaining promises
function getCountry(country) {
  getJson(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    "Country not found"
  )
    .then((data) => {
      renderHtml(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error("no neighbour found!");
      return getJson(
        (`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        "Country not found")
      );
    })
    .then((data) => renderHtml(data, "neighbour"))
    .catch((err) =>
      renderError(`Something went wrong!  ${err.message} try again !`)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); //json is asynchronous too,returns a promise-then
}

btn.addEventListener("click", function () {
  //getCountry("Canada");
  //error handler-throw new error
});
//getCountry("australia");

///Challenge--
//https://www.google.com/maps/place/West+Edmonton,+Edmonton,+AB/@53.4882445,-113.6223211,11z/data=!3m1!4b1!4m6!3m5!1s0x53a020020ac73edf:0x94cd542520127dfa!8m2!3d53.5213435!4d-113.6303625!16s%2Fg%2F1tdvzkv8?entry=ttu
/*const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`  
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then((data) => renderHtml(data[0]))
    .catch((err) => console.error(`${err.message} 💥`))
    .finally((countriesContainer.style.opacity = 1));
};
whereAmI(53.4882445, -113.6223211);
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);

//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);

//Single thread--MICROTASKS QUEUE
console.log("Test Started"); //synchron-1
setTimeout(() => console.log("Set time 0 sec"), 0); //asynchronous -4
Promise.resolve("Promise resolved 1").then((resp) => {
  for (let i = 0; i < 1000; i++) {}
  console.log(resp);
}); //asynchronous-3,microtask
console.log("Test ended"); //synchron-2

//create promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Something is happening");
  setTimeout(function () {
    if (Math.random() >= 0.5) resolve("You win moneyyy");
    else reject(new Error("you lost money"));
  }, 2000);
});
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
//like fetch if needed or if you want you can return a promise again
wait(2)
  .then(() => {
    console.log("1 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("3 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("4 seconds");
    return wait(1);
  });

Promise.resolve("abc").then((x) => console.log(x));
Promise.reject(new Error("no")).catch((x) => console.error(x));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    /*navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err)
    );
  });
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then((pos) => console.log(pos));
const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    })

    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then((data) => renderHtml(data[0]))
    .catch((err) => console.error(`${err.message} 💥`))
    .finally((countriesContainer.style.opacity = 1));
};
whereAmI();  
*/
function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000 * seconds);
  });
}
/*

const images = document.querySelector(".images");
function createImg(path) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement("img");
    image.src = path;
    //the image loads asynchronously
    image.addEventListener("load", function () {
      images.append(image);
      resolve(image);
    });
    image.addEventListener("error", function () {
      reject(new Error("Image not found!"));
    });
  });
} /*
let currentImg;
//the promise is paused for 2 seconds after loading
createImg("Afghanistan.avif")
  .then((img) => {
    currentImg = img; //to keep this img in a variable that i can use any time!
    console.log("image loaded");
    return wait(2);
  })
  .then(() => {
    //this happens after 2 seconds
    currentImg.style.display = "none";
    console.log("2 seconds");
    return createImg("../BANKİSTPro/bank.icons/card.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("image loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    console.log("2 seconds");
  })
  .catch((err) => console.error(err));
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    const pos = await getPosition(); //it is a promise
    const { latitude: lat, longitude: lng } = pos.coords;
    const geoRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!geoRes.ok) throw new Error("not found");
    const dataGeo = await geoRes.json();
    console.log(dataGeo);
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
    );
    if (!res.ok) throw new Error("not found");
    console.log(res);
    const data = await res.json();
    console.log(data);
    renderHtml(data[0]);
    return `you are in ${data[0].name} ,edmonton`;
  } catch (err) {
    console.error(err);
    renderError(err.message);
    throw err;
  }
};
console.log("here");
const city = whereAmI();
console.log(city);
whereAmI()
  .then((city) => console.log(city))
  .catch((err) => console.error(err.message))
  .finally(() => console.log("FİRST"));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(err.message);
  }
  console.log("first");
});
/*
///PARALEL __ASYNCHRONOUS
const getCountries = async function (c1, c2, c3) {
  try {
    /*not happening at the same time--doesnt need to for eachpther cause ther arent dependent
    const [data1] = await getJson(
      `https://countries-api-836d.onrender.com/countries/name/${c1}`
    );
    const [data2] = await getJson(
      `https://countries-api-836d.onrender.com/countries/name/${c2}`
    );
    const [data3] = await getJson(
      `https://countries-api-836d.onrender.com/countries/name/${c3}`
    );
    console.log([data1.capital, data2.capital, data3.capital]);
    const datas = await Promise.all([
      getJson(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJson(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJson(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(datas.map((d) => d[0].capital));
  } catch (err) {
    console.error(err.message);
  }
};
getCountries("Canada", "Turkey", "Afghanistan");

//promise.race()--returns the first returned promise

(async function () {
  const res = await Promise.race([
    getJson(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJson(`https://countries-api-836d.onrender.com/countries/name/Canada`),
    getJson(`https://countries-api-836d.onrender.com/countries/name/Turkey`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, 1000 * sec);
  });
};

Promise.race([
  getJson(`https://countries-api-836d.onrender.com/countries/name/italy`),
  timeout(0.1),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

Promise.allSettled([
  Promise.resolve("Success"),
  Promise.resolve("2nd.Success"),
  Promise.reject("rejected"),
]).then((res) => console.log(res));

Promise.any([
  Promise.resolve("Success"),
  Promise.resolve("2nd.Success"),
  Promise.reject("rejected"),
]).then((res) => console.log(res));*/

//coding challenge #3
const images = document.querySelector(".images");
function createImg(path) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement("img");
    image.src = path;
    //the image loads asynchronously
    image.addEventListener("load", function () {
      images.append(image);
      resolve(image);
    });
    image.addEventListener("error", function () {
      reject(new Error("Image not found!"));
    });
  });
}
btn.style.display = "none";
//part1;
async function loadnPause() {
  try {
    let img = await createImg("Afghanistan.avif");
    console.log("image 1 loaded");
    await wait(2);
    images.style.display = "none";
    await wait(2);

    img = await createImg("../BANKİSTPro/bank.icons/img-2.jpg");
    images.style.display = "block";
    console.log("2nd image loaded");
    await wait(2);
    images.style.display = "none";
    await wait(2);

    img = await createImg("../BANKİSTPro/bank.icons/card.jpg");
    images.style.display = "block";
    console.log("3rd image loaded");
    await wait(2);
    images.style.display = "none";
    await wait(2);
  } catch (err) {
    console.error(err);
  }
}
//loadnPause(); //all three images load one after another

//part 2:
async function loadAll(imgArr) {
  try {
    //add await before map-same way
    const images = imgArr.map(async (img) => await createImg(img));
    console.log(images);
    //take out images out of Proimse
    const imgs = await Promise.all(images);
    console.log(imgs);

    imgs.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.log(err.message);
  }
}
loadAll([
  "Afghanistan.avif",
  "../BANKİSTPro/bank.icons/img-2.jpg",
  "../BANKİSTPro/bank.icons/card.jpg",
]);
