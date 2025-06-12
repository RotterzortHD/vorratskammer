export let produkte = JSON.parse(localStorage.getItem('produkte')) || [];

export function speichern() {
  localStorage.setItem('produkte', JSON.stringify(produkte));
}

export function laden() {
  produkte = JSON.parse(localStorage.getItem('produkte')) || [];
  return produkte;
}
