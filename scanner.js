import { fetchProduktname } from './openfoodfacts.js';

export async function startScanner() {
  const reader = document.getElementById('reader');
  reader.style.display = 'block';

  try {
    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) throw new Error('Keine Kamera gefunden');
    const backCamera = cameras.find(cam => cam.label.toLowerCase().includes('back')) || cameras[0];

    const qrCodeScanner = new Html5Qrcode("reader");

    await qrCodeScanner.start(
      { deviceId: { exact: backCamera.id } },
      {
        fps: 30,
        qrbox: { width: 350, height: 200 },
        disableFlip: true,
        formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
        experimentalFeatures: { useBarCodeDetectorIfSupported: true }
      },
      async (barcode) => {
        await qrCodeScanner.stop();
        qrCodeScanner.clear();
        reader.style.display = 'none';

        const produkt = await fetchProduktname(barcode);
        if (produkt) {
          document.getElementById('name').value = produkt;
          document.getElementById('menge').value = '1 Stück';
        } else {
          alert('Produkt nicht gefunden. Bitte manuell eingeben.');
        }
      },
      (error) => { /* optional: log errors */ }
    );
  } catch (err) {
    reader.style.display = 'none';
    alert('Kamera-Zugriff fehlgeschlagen:\n' + (err.message || JSON.stringify(err) || err));
  }
}
