export function downloadBlob(blob, fileName) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function downloadUrl(publicUrl, fileName) {
  const a = document.createElement('a');
  a.href = publicUrl;
  a.download = fileName;
  a.target = '_blank';
  a.rel = 'noopener';
  a.click();
}
