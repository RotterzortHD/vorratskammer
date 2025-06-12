import { startScanner } from './scanner.js';
import { fetchProduktname } from './openfoodfacts.js';
import { speichern, laden, produkte } from './storage.js';
import { anzeigen } from './ui.js';

window.produkte = produkte;
window.startScanner = startScanner;

window.hinzufuegen = function () {
  const name = document.getElementById('name').value.trim();
  const menge = document.getElementById('menge').value.trim();
  const haltbarkeit = document.getElementById('haltbarkeit').value;

  if (!name || !menge) return alert('Bitte Name und Menge eingeben.');

  produkte.push({ name, menge, haltbarkeit });
  speichern();
  anzeigen();
  document.getElementById('name').value = '';
  document.getElementById('menge').value = '';
  document.getElementById('haltbarkeit').value = '';
};

window.loeschen = function (index) {
  if (!confirm('Produkt wirklich entfernen?')) return;
  produkte.splice(index, 1);
  speichern();
  anzeigen();
};

window.bearbeiten = function (index) {
  const p = produkte[index];
  document.getElementById('name').value = p.name;
  document.getElementById('menge').value = p.menge;
  document.getElementById('haltbarkeit').value = p.haltbarkeit;
  produkte.splice(index, 1);
  speichern();
  anzeigen();
};

anzeigen();
