export async function fetchProduktname(barcode) {
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();
    if (data.status === 1) {
      return data.product.product_name || "Unbenanntes Produkt";
    }
  } catch (e) {
    console.error("Fehler beim Laden von Produktdaten:", e);
  }
  return null;
}
