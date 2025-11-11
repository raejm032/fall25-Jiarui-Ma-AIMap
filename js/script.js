/* =========================================================
   AI Map Project — home.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("destinations-container");
  if (!container || !destinations) return;

  destinations.forEach(place => {
    // create external div
    const card = document.createElement("div");
    card.classList.add("destination-card");

    // connect image
    const img = document.createElement("img");
    img.src = place.imagePath;
    img.alt = place.name;

    // set title
    const title = document.createElement("h3");
    title.textContent = place.name;

    // description
    const desc = document.createElement("p");
    desc.textContent = place.description;

    // rating
    const rating = document.createElement("span");
    rating.classList.add("rating");
    rating.textContent = `⭐ ${place.rating.toFixed(1)}`;

    // append all to card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(rating);
    container.appendChild(card);
  });
});
