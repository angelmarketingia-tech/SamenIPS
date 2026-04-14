const fs = require('fs');
const files = ['index.html', 'nosotros.html', 'servicios.html', 'sedes.html', 'blog.html', 'contacto.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix the selectServiceAndScroll JS logic
  const originalLogic = /function selectServiceAndScroll\(serviceValue\) \{[\s\S]*?\}\s*\}/;
  const newLogic = `
function selectServiceAndScroll(serviceValue) {
  localStorage.setItem('selectedService', serviceValue);
  window.location.href = 'contacto.html';
}`;

  // Let's just do a manual replace of the entire function block safely
  content = content.replace(/function selectServiceAndScroll\([^)]*\)\s*\{[\s\S]*?(?=document\.getElementById\('hamburger')/m, newLogic + '\n\n    ');

  // Fix the Logo Link
  content = content.replace(/<a[^>]*class="\s*logo-container\s*"[^>]*>/, '<a href="index.html" class="logo-container">');
  
  // Add initialization logic at the end of window.onload or DOMContentLoaded
  // to fetch 'selectedService' and auto-fill the contact form
  if (!content.includes('localStorage.getItem')) {
    const initScript = `
document.addEventListener('DOMContentLoaded', () => {
  const storedService = localStorage.getItem('selectedService');
  if (storedService) {
    const selector = document.getElementById('servicio-select');
    if (selector) {
      selector.value = storedService;
      localStorage.removeItem('selectedService'); // Clear after use
    }
  }
});
</script>
`;
    content = content.replace('</script>', initScript);
  }

  fs.writeFileSync(file, content);
});

console.log('Patch complete.');
