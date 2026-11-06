/**
 * Resolve o caminho correto para imagens baseado no ambiente
 * @param imagePath - Caminho da imagem (ex: '/images/santos/sao-francisco.jpg')
 * @returns Caminho correto da imagem
 */
export const getImagePath = (imagePath: string): string => {
  // Remove barra inicial se existir
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // O site fica em /Apenas-um-Catolico/ tanto no GitHub Pages quanto no `npm start`
  // (o CRA usa o "homepage" do package.json nos dois), então o prefixo vale sempre.
  return `${process.env.PUBLIC_URL || ''}/${cleanPath}`;
};

/**
 * Resolve o caminho para imagens de santos
 * @param filename - Nome do arquivo (ex: 'sao-francisco.jpg')
 * @returns Caminho completo da imagem
 */
export const getSantoImagePath = (filename: string): string => {
  return getImagePath(`images/santos/${filename}`);
};

/**
 * Resolve o caminho para logos
 * @param filename - Nome do arquivo (ex: 'Logo tipo apenas um catolico.png')
 * @returns Caminho completo da imagem
 */
export const getLogoPath = (filename: string): string => {
  return getImagePath(`images/logos/${filename}`);
};
