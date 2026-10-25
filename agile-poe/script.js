/* Auto-load evidence when you upload files using the names listed in EDITING_GUIDE.md.
   If a file is not yet present, the explanatory placeholder remains visible. */
for (const box of document.querySelectorAll('[data-image-src]')) {
  const img = new Image();
  img.alt = box.dataset.imageAlt || 'Portfolio supporting evidence';
  img.loading = 'lazy';
  img.addEventListener('load', () => {box.replaceChildren(img);box.classList.add('has-image');});
  img.src = box.dataset.imageSrc;
}
for (const box of document.querySelectorAll('[data-document-src]')) {
  const url = box.dataset.documentSrc;
  fetch(url, {method:'HEAD'}).then(result => {
    if (!result.ok) return;
    box.classList.add('ready');
    const description = box.querySelector('div');
    if (!description) return;
    const link = document.createElement('a');
    link.href = url;
    link.textContent = 'Open supporting Agile logbook PDF ↗';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    description.replaceChildren(link);
  }).catch(()=>{});
}
