//data dinamica
document.getElementById("anno").textContent = new Date().getFullYear();
//Navbar dinamica

// Array di oggetti del carrello
const items = [
  {
    nome: "Dadi Da Gioco",
    immagine:
      "https://everhearthinn.com/wp-content/uploads/2022/06/Dwarven-Hammer-Copper-Metal-DnD-Dice-Set.webp",
    prezzo: "15.99€",
  },
  {
    nome: "Torre Lancia Dadi",
    immagine:
      "https://i.etsystatic.com/19673862/r/il/600bff/5729843021/il_570xN.5729843021_ryv6.jpg",
    prezzo: "39.99€",
  },
  {
    nome: "Pedine Guerrieri",
    immagine:
      "https://weprintminiatures.com/cdn/shop/collections/dungeons-and-dragons-miniatures-403784_1024x1024.jpg?v=1696606504",
    prezzo: "5.99€ (CAD)",
  },
  {
    nome: "Scrigno Per Dadi",
    immagine:
      "https://i.etsystatic.com/30215457/r/il/519a28/5098268074/il_fullxfull.5098268074_aog1.jpg",
    prezzo: "30€",
  },
  {
    nome: "Set Mappe",
    immagine:
      "https://149455152.v2.pressablecdn.com/wp-content/uploads/2021/01/Exteriors.jpg",
    prezzo: "12€",
  },
  {
    nome: "Portachiavi",
    immagine:
      "https://i.etsystatic.com/9665931/r/il/47afd6/4444301092/il_340x270.4444301092_rphf.jpg",
    prezzo: "4.99€ (CAD)",
  },
];

// Selezione del contenitore
const container = document.getElementById("cardContainer");
const carrelloLista = document.getElementById("carrello-lista");

const selectedItems = new Set(); // Set per memorizzare gli elementi selezionati

// Funzione per aggiornare il carrello
function aggiornaCarrello() {
  carrelloLista.innerHTML = ""; // Svuota il carrello

  // Aggiungi ogni elemento selezionato al carrello
  selectedItems.forEach((item) => {
    const carrelloItem = document.createElement("div");
    carrelloItem.classList.add("carrello-item");

    // Costruzione del contenuto del carrello
    carrelloItem.innerHTML = `
      <img src="${item.immagine}" alt="${item.nome}" class="carrello-immagine">
      <p>${item.nome}</p>
      <p>${item.prezzo}</p>
    `;

    carrelloLista.appendChild(carrelloItem); // Aggiungi l'elemento al carrello
  });
}

// Funzione per creare le card
function renderCards(items) {
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Creazione della checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.index = index; // Salva l'indice dell'oggetto
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      if (event.target.checked) {
        selectedItems.add(items[itemIndex]); // Aggiungi l'oggetto selezionato
      } else {
        selectedItems.delete(items[itemIndex]); // Rimuovi se deselezionato
      }
      aggiornaCarrello(); // Aggiorna il carrello ogni volta che cambia la selezione
    });

    // Costruzione della card
    card.innerHTML = `
      <h3>${item.nome}</h3>
      <img src="${item.immagine}" alt="${item.nome}">
      <p>Prezzo: ${item.prezzo}</p>
    `;

    card.appendChild(checkbox); // Aggiunta della checkbox alla card
    container.appendChild(card); // Aggiunta della card al contenitore
  });
}

// Rendering delle card iniziale
renderCards(items);

// Funzione per creare il paragrafo in "About us"
document.getElementById("aboutus").addEventListener("click", function () {
  createParagraph("Il Gruppo2 è una classe di Develhope", "output-aboutus");
});

// Funzione per creare immagini in "Artwork"
document.getElementById("artwork").addEventListener("click", function () {
  createImageGallery("output-artwork");
});

// Funzione per creare il paragrafo in "API"
document.getElementById("api").addEventListener("click", function () {
  createParagraph("Link API: https://www.dnd5eapi.co", "output-api");
});

// Funzione per creare il paragrafo in "Licenza"
document.getElementById("licenza").addEventListener("click", function () {
  createParagraph(
    "Tutti i contenuti del nostro sito, dei nostri podcast e dei nostri giochi sono rilasciati con licenza",
    "output-licenza"
  );
});

// Funzione generica per creare il paragrafo e il bottone di chiusura
function createParagraph(text, outputId) {
  const container = document.getElementById(outputId);

  // Se l'elemento di output non è trovato, termina la funzione
  if (!container) {
    console.error(`Elemento #${outputId} non trovato!`);
    return;
  }

  // Se esiste già un paragrafo dentro il container, non ne aggiunge un altro
  if (container.querySelector(".elemento-creato")) {
    return;
  }

  // Crea il bottone di chiusura
  const button = document.createElement("button");
  button.classList.add("btn-close");
  button.innerText = "X";

  // Crea il paragrafo
  const paragraph = document.createElement("p");
  paragraph.classList.add("elemento-creato");
  paragraph.innerText = text;

  // Aggiunge il bottone prima del paragrafo
  container.appendChild(button);
  container.appendChild(paragraph);

  // Evento per rimuovere il paragrafo e il bottone quando si clicca sul bottone
  button.addEventListener("click", function () {
    console.log("Bottone premuto! Rimuovo il paragrafo...");
    button.remove(); // Rimuove il bottone
    paragraph.remove(); // Rimuove il paragrafo
  });
}
// Funzione per creare una galleria di immagini
function createImageGallery(outputId) {
  const container = document.getElementById(outputId);

  if (!container) {
    console.error(`Elemento #${outputId} non trovato!`);
    return;
  }

  if (container.querySelector(".gallery")) {
    return; // Evita di creare la galleria più volte
  }

  const galleryDiv = document.createElement("div");
  galleryDiv.classList.add("gallery");

  // Array con i percorsi delle immagini
  const images = [
    "src/assets/copertina.jpg",
    "src/assets/descrizione-gioco.jpeg",
    "src/assets/footer-background.jpeg",
    "src/assets/negozio-gioco.jpeg",
  ];

  // Bottone per chiudere la galleria
  const button = document.createElement("button");
  button.classList.add("btn-close");
  button.innerText = "X";
  galleryDiv.appendChild(button);

  container.appendChild(galleryDiv);

  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Artwork Image";
    img.classList.add("gallery-image");
    galleryDiv.appendChild(img);
  });

  button.addEventListener("click", function () {
    console.log("Bottone premuto! Rimuovo la galleria...");
    galleryDiv.remove();
  });
}

async function fetchMonstersForCarousel() {
  try {
    const response = await fetch("https://www.dnd5eapi.co/api/monsters");
    if (!response.ok) {
      throw new Error("Errore durante la fetch dei mostri.");
    }

    const data = await response.json();
    const monsters = data.results.slice(2, 23); // Prendi i primi 10 mostri
    const carouselContainer = document.getElementById("monster-carousel");

    // Aggiunta dinamica delle card
    monsters.forEach((monster, index) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");

      item.innerHTML = `
        <h3>${monster.name}</h3>
        <img src="https://www.dnd5eapi.co/api/2014/images/monsters/${monster.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/'/g, "")
          .replace(/,/g, "")
          .replace(/&/g, "and")}.png" 
          alt="${monster.name}" 
          onerror="this.src='https://via.placeholder.com/150';" />
      `;
      carouselContainer.appendChild(item);
    });

    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");

    // Funzione per aggiornare il carosello
    function updateCarousel() {
      items.forEach((item, index) => {
        // Mostra o nasconde gli elementi in base alla posizione
        item.style.display =
          index >= currentIndex && index < currentIndex + 3 ? "block" : "none";
      });
    }

    // Eventi per i bottoni
    document.getElementById("prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 3 + items.length) % items.length;
      updateCarousel();
    });

    document.getElementById("next").addEventListener("click", () => {
      currentIndex = (currentIndex + 3) % items.length;
      updateCarousel();
    });

    updateCarousel(); // Inizializza il carosello
  } catch (error) {
    console.error("Errore:", error);
  }
}

// Inizializza il carosello
fetchMonstersForCarousel();

// Chiamata alla funzione per fetchare e renderizzare i mostri
fetchMonsters();
