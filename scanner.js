let qrCodeScanner = null;

async function fetchProduktname(barcode) {
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

window.startScanner = async function () {
  const reader = document.getElementById('reader');
  reader.style.display = 'block';

  try {
    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) throw new Error('Keine Kamera gefunden');

    const backCamera = cameras.find(cam => cam.label.toLowerCase().includes('back')) || cameras[0];

    if (qrCodeScanner) {
      await qrCodeScanner.stop().catch(console.error);
      qrCodeScanner.clear();
    }

    qrCodeScanner = new Html5Qrcode("reader");

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
      (error) => {
        console.warn('Scan-Fehler:', error);
      }
    );
  } catch (err) {
    reader.style.display = 'none';
    console.error('Kamera-Zugriff fehlgeschlagen:', err);
    alert('Kamera-Zugriff fehlgeschlagen:\n' + (err.message || JSON.stringify(err) || err));
  }
};
