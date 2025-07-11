/**
 * Resolve o caminho correto para imagens baseado no ambiente
 * @param imagePath - Caminho da imagem (ex: '/images/santos/sao-francisco.jpg')
 * @returns Caminho correto da imagem
 */
export const getImagePath = (imagePath: string): string => {
  // Remove barra inicial se existir
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Em produção (GitHub Pages), usa o PUBLIC_URL
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.PUBLIC_URL}/${cleanPath}`;
  }
  
  // Em desenvolvimento, usa o caminho normal
  return `/${cleanPath}`;
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

/**
 * Resolve o caminho para imagens de heróis
 * @param filename - Nome do arquivo (ex: 'hero-jesus.png')
 * @returns Caminho completo da imagem
 */
export const getHeroImagePath = (filename: string): string => {
  return getImagePath(`images/heroes/${filename}`);
}; 