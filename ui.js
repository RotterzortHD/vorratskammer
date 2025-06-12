import { produkte } from './storage.js';

export function anzeigen() {
  const liste = document.getElementById('liste');
  liste.innerHTML = '';
  const heute = new Date().toISOString().split('T')[0];

  produkte.sort((a, b) => {
    if (!a.haltbarkeit) return 1;
    if (!b.haltbarkeit) return -1;
    return a.haltbarkeit.localeCompare(b.haltbarkeit);
  });

  produkte.forEach((p, index) => {
    const div = document.createElement('div');
    div.className = 'produkt';
    if (p.haltbarkeit && p.haltbarkeit < heute) {
      div.classList.add('abgelaufen');
    }

    div.innerHTML = `
      <strong>${p.name}</strong><br>
      Menge: ${p.menge}<br>
      Haltbar bis: ${p.haltbarkeit || 'unbekannt'}<br>
      <button onclick="bearbeiten(${index})">✏️ Bearbeiten</button>
      <button onclick="loeschen(${index})">🗑️ Entfernen</button>
    `;
    liste.appendChild(div);
  });
}
