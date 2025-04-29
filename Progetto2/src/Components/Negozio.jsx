import items from "../ItemsNegozio";
export default function Negozio() {
  function aggiungiAlCarrello(item) {
    const prodottiSalvati = JSON.parse(
      localStorage.getItem("prodotti") || "[]"
    );

    // Se esiste già lo stesso prodotto, aumenta la quantità
    const esistente = prodottiSalvati.find((p) => p.id === item.id);
    if (esistente) {
      esistente.quantity = (esistente.quantity || 1) + 1;
    } else {
      prodottiSalvati.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("prodotti", JSON.stringify(prodottiSalvati));
    alert(`${item.title} aggiunto al carrello`);
  }
  return (
    <>
      <h1 className="bestiario">NEGOZIO</h1>
      <div className="card-container" id="cardContainer">
        {items.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.nome}</h3>
            <img src={item.immagine} />
            <p>{item.prezzo}€</p>
            <button
              className="normal-signin"
              onClick={() =>
                aggiungiAlCarrello({
                  id: index,
                  title: item.nome,
                  price: item.prezzo,
                  image: item.immagine,
                })
              }
            >
              Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
