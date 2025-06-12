let produkte = JSON.parse(localStorage.getItem('produkte')) || [];

function speichern() {
  localStorage.setItem('produkte', JSON.stringify(produkte));
}

function anzeigen() {
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

function hinzufuegen() {
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
}

function loeschen(index) {
  if (!confirm('Produkt wirklich entfernen?')) return;
  produkte.splice(index, 1);
  speichern();
  anzeigen();
}

function bearbeiten(index) {
  const p = produkte[index];
  document.getElementById('name').value = p.name;
  document.getElementById('menge').value = p.menge;
  document.getElementById('haltbarkeit').value = p.haltbarkeit;
  produkte.splice(index, 1);
  speichern();
  anzeigen();
}

anzeigen();
