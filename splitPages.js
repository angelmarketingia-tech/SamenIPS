const fs = require('fs');
const cheerio = require('cheerio');

const htmlContent = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(htmlContent);

// Fix Navbar links in the loaded DOM for ALL pages
const linkMap = {
  '#servicios': 'servicios.html',
  '#nosotros': 'nosotros.html',
  '#equipo': 'nosotros.html#equipo',
  '#sedes': 'sedes.html',
  '#blog': 'blog.html',
  '#testimonios': 'index.html#testimonios',
  '#trabaja': 'nosotros.html#trabaja',
  '#contacto': 'contacto.html'
};

$('a').each((i, el) => {
  const href = $(el).attr('href');
  if (linkMap[href]) {
    $(el).attr('href', linkMap[href]);
  }
});
$('.logo-container').parent().attr('href', 'index.html'); // Ensure logo goes to home

// Keep a copy of the base DOM with fixed navbar
const baseHtml = $.html();

function createPage(filename, sectionIds) {
  const pageDoc = cheerio.load(baseHtml);
  
  // Find all sections inside <main>
  const allSections = [];
  pageDoc('main > section').each((i, el) => {
    allSections.push(pageDoc(el).attr('id'));
  });
  
  // Remove sections not in our list
  allSections.forEach(id => {
    if (!sectionIds.includes(id)) {
      pageDoc(`#${id}`).remove();
    }
  });

  // Fix active nav link based on URL if needed (we can skip purely visual active states or handle via JS)
  
  fs.writeFileSync(filename, pageDoc.html());
  console.log('Created:', filename);
}

// 1. Home (index.html)
createPage('index.html', ['hero', 'stats', 'servicios-banner', 'testimonios']);

// 2. Nosotros (nosotros.html)
createPage('nosotros.html', ['nosotros', 'equipo', 'trabaja']);

// 3. Servicios (servicios.html)
createPage('servicios.html', ['servicios']);

// 4. Sedes (sedes.html)
createPage('sedes.html', ['sedes']);

// 5. Blog (blog.html)
createPage('blog.html', ['blog']);

// 6. Contacto (contacto.html)
createPage('contacto.html', ['contacto']);

console.log("Pages generated successfully!");
