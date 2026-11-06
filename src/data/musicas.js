// Música de cada santo.
//
// Duas formas:
// - `url`: gravação em domínio público ou licença livre do Wikimedia Commons. Toca por baixo
//   da página, sem player visível (permitido pela licença), depois de um clique.
// - `youtube`: para músicas católicas conhecidas, com o vídeo oficial. Usa o player do YouTube,
//   que precisa ficar visível pelos termos do YouTube; ele abre pequeno no lugar do botão e
//   continua tocando enquanto a pessoa desce a página. Quando existe, tem prioridade.
//
// Para trocar a música de um santo por um vídeo do YouTube, preencha:
//   youtube: { id: 'ID_DO_VIDEO', titulo: 'Nome da música', artista: 'Quem canta' }

const COMMONS = 'https://upload.wikimedia.org/wikipedia/commons/transcoded';

export const musicas = {
  'sao-francisco': {
    rotulo: 'Ouvir uma música',
    obra: 'A Manhã, de Grieg (Peer Gynt)',
    interprete: 'Musopen Symphony',
    licenca: 'domínio público',
    pagina:
      'https://commons.wikimedia.org/wiki/File:Grieg_-_Peer_Gynt_Suite_No._1,_Op._46_-_I._Morning_Mood_(Musopen_Symphony).flac',
    url: `${COMMONS}/c/c2/Grieg_-_Peer_Gynt_Suite_No._1%2C_Op._46_-_I._Morning_Mood_%28Musopen_Symphony%29.flac/Grieg_-_Peer_Gynt_Suite_No._1%2C_Op._46_-_I._Morning_Mood_%28Musopen_Symphony%29.flac.mp3`,
    // do álbum Amigos do Céu; "Doce é sentir" é o canto do filme Irmão Sol, Irmã Lua
    youtube: {
      id: 'fopVTtsIK6Q',
      titulo: 'Nada ter pra tudo dar / Doce é sentir',
      artista: 'Missionário Shalom',
    },
  },
  'santa-teresinha': {
    rotulo: 'Ouvir uma música',
    obra: 'Felicidade, das Cenas Infantis de Schumann',
    interprete: 'gravação do Musopen',
    licenca: 'domínio público',
    pagina:
      'https://commons.wikimedia.org/wiki/File:Robert_Schumann_-_scenes_from_childhood,_op._15_-_v._happiness.ogg',
    url: `${COMMONS}/0/04/Robert_Schumann_-_scenes_from_childhood%2C_op._15_-_v._happiness.ogg/Robert_Schumann_-_scenes_from_childhood%2C_op._15_-_v._happiness.ogg.mp3`,
    // o elevador é a imagem da pequena via, na História de uma Alma
    youtube: {
      id: 'P91rNOstR9w',
      titulo: 'O Elevador',
      artista: 'Comunidade Católica Shalom',
    },
  },
  'padre-pio': {
    rotulo: 'Ouvir uma música',
    obra: 'Concerto para dois bandolins, de Vivaldi',
    interprete: 'The Modena Chamber Orchestra',
    licenca: 'domínio público',
    pagina:
      "https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi's_Concerto_for_2_Mandolins_in_G_major,_RV_532_-_I._Allegro.ogg",
    url: `${COMMONS}/c/c7/The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Concerto_for_2_Mandolins_in_G_major%2C_RV_532_-_I._Allegro.ogg/The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Concerto_for_2_Mandolins_in_G_major%2C_RV_532_-_I._Allegro.ogg.mp3`,
    // do álbum Amigos do Céu, sobre a oração que Padre Pio rezava depois da comunhão
    youtube: {
      id: 'jF5QdlnTQcM',
      titulo: 'Fica, Senhor, comigo',
      artista: 'Missionário Shalom',
    },
  },
  'nossa-senhora': {
    rotulo: 'Ouvir uma música',
    obra: 'Clair de lune, de Debussy',
    interprete: 'Laurens Goedhart, piano',
    licenca: 'domínio público',
    pagina:
      'https://commons.wikimedia.org/wiki/File:Clair_de_lune_(Claude_Debussy)_Suite_bergamasque.ogg',
    url: `${COMMONS}/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg.mp3`,
    youtube: {
      id: 'Ip9MqhxetYk',
      titulo: 'Todo Teu, ó Mãe',
      artista: 'Missionário Shalom e Susi Castro',
    },
  },
};
