// O GitHub Pages só conhece arquivos. Sem isto, abrir /santos direto dava 404
// e dependia do redirecionamento do 404.html (que o Google não indexa).
// Depois do build, cada rota ganha a sua cópia do index.html e responde 200.

const fs = require('fs');
const path = require('path');

// As páginas dos santos saem dos slugs cadastrados em src/data/santos.js
const dadosSantos = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'santos.js'), 'utf8');
const rotasSantos = [...dadosSantos.matchAll(/slug:\s*'([^']+)'/g)].map(([, slug]) => `santos/${slug}`);

const ROTAS = [
  'santos',
  ...rotasSantos,
  'oracao',
  'calendario',
  'blog',
  'blog/celular',
  'sobre',
  'laudes',
  'liturgia-diaria',
];

const build = path.join(__dirname, '..', 'build');
const index = path.join(build, 'index.html');

if (!fs.existsSync(index)) {
  console.error('build/index.html não encontrado. Rode "npm run build" primeiro.');
  process.exit(1);
}

for (const rota of ROTAS) {
  const pasta = path.join(build, rota);
  fs.mkdirSync(pasta, { recursive: true });
  fs.copyFileSync(index, path.join(pasta, 'index.html'));
}

console.log(`Rotas estáticas criadas: ${ROTAS.length}`);
