/* =========================================================
   AI Map Project — script.js
   function： OpenAI(Chatbox)+ Mapbox + Leaflet
   ========================================================= */

// api keys
const OPENAI_KEY = "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";
const MAPBOX_TOKEN = "pk.eyJ1IjoicmFlam0wMzIiLCJhIjoiY21ncG12aXN6MmpuejJpb2o3bTFiMW12dyJ9.RyfFC8GjitN36hrb0PIPKw";

const tabButtons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.map-section');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.getAttribute('data-tab');
    sections.forEach(s => {
      s.classList.remove('active');
      if (s.id === tab) s.classList.add('active');
    });
    if (tab === "overview" && window.map) {
      setTimeout(() => map.invalidateSize(), 100);
    }
  });
});

// setup map
let map, markers = [];

document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    map = L.map('map').setView([40.7831, -73.9712], 13); // default is NYC
    L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, {
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      attribution: '© Mapbox © OpenStreetMap'
    }).addTo(map);
  }
});

// setup chatbox
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('userInput');

  sendBtn.addEventListener('click', async () => {
    const msg = userInput.value.trim();
    if (!msg) return;

    // display thinking message
    chatWindow.innerHTML += `<p><strong>AI:</strong> Let me think...</p>`;

    // connect to OpenAI
    const aiResult = await askOpenAI(msg);

    // display user message
    chatWindow.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
    userInput.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // --- Intelligent place recognition + validation ---
    const realPlaces = await extractRealPlaces(aiResult.message);
    if (realPlaces.length > 0) {
      // Clear old markers
      markers.forEach(m => map.removeLayer(m));
      markers = [];

      // Add new markers for all recognized places
      for (let p of realPlaces) {
        const marker = L.marker(p.coords).addTo(map)
          .bindPopup(`<b>${p.name}</b><br>Coordinates: ${p.coords[0].toFixed(4)}, ${p.coords[1].toFixed(4)}`)
          .openPopup();
        markers.push(marker);
      }

      // Fit map to show all markers
      if (realPlaces.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  });
}

// connect to OpenAI API function
async function askOpenAI(prompt) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a friendly AI assistant helping users with travel and geography questions. Please use English for all place names and responses." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });
    const data = await res.json();
    const text = data.choices[0].message.content;
    return { message: text };
  } catch (err) {
    console.error(err);
    return { message: "Error contacting AI." };
  }
}

// ---------- Intelligent Place Extraction & Validation ----------
function extractCandidatePlaces(text) {
  // Improved regex to better capture place names
  const matches = text.match(/\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)\b/g) || [];
  
  const stopwords = [
    "If", "You", "I", "He", "She", "We", "It", "They", "The", "And", "But",
    "Who", "Where", "When", "Why", "What", "A", "An", "In", "On", "At",
    "Of", "For", "This", "That", "Those", "These", "Is", "Are", "Was", "Were",
    "To", "From", "By", "With", "As", "Be", "Not", "Or", "So", "Please",
    "Hello", "Hi", "Yes", "No", "Okay", "OK", "Could", "Would", "Should",
    "Will", "Can", "May", "Might", "Must", "Let", "Like"
  ];
  
  return matches.filter(word => 
    !stopwords.includes(word) && 
    word.length > 1 && 
    !/\d/.test(word)
  );
}

async function extractRealPlaces(text) {
  const candidates = extractCandidatePlaces(text);
  const validPlaces = [];
  
  for (let c of candidates) {
    const placeData = await validatePlaceWithMapbox(c);
    if (placeData) {
      validPlaces.push({ 
        name: placeData.name
      });
    }
  }
  return validPlaces;
}

async function validatePlaceWithMapbox(place) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${MAPBOX_TOKEN}&limit=1&language=en`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const [lon, lat] = feature.center;
      
      // Use the English place name from Mapbox
      const placeName = feature.text || feature.place_name || place;
      
      return {
        name: placeName,
        coords: [lat, lon]
      };
    }
    return null;
  } catch (err) {
    console.error("Error validating place with Mapbox:", err);
    return null;
  }
}