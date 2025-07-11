# Apenas um Católico 🙏

Site católico dedicado à evangelização e devoção aos santos, desenvolvido com React e styled-components.

## ✨ Características Principais

- **Interface Responsiva**: Design adaptativo para desktop, tablet e mobile
- **Performance Otimizada**: Lazy loading, code splitting e otimização de imagens
- **SEO Avançado**: Meta tags dinâmicas e structured data
- **Acessibilidade**: Componentes acessíveis e navegação keyboard-friendly
- **Temas**: Suporte a modo claro e escuro
- **PWA Ready**: Service worker e manifest configurados

## 🚀 Melhorias Implementadas

### 🧹 **Limpeza e Organização**
- ✅ Removidos arquivos duplicados (HTML/CSS/JS na raiz)
- ✅ Limpeza de estrutura de pastas vazias
- ✅ Reorganização de imagens por categoria
- ✅ Divisão de componentes grandes em módulos menores

### 🔧 **Correções Técnicas**
- ✅ Corrigidos imports incorretos (useTheme)
- ✅ Atualizadas dependências para versões mais recentes
- ✅ Configuração do ESLint e Prettier
- ✅ Implementação de Error Boundaries

### 🎨 **Otimizações de Performance**
- ✅ Lazy loading de componentes React
- ✅ Componente de imagem otimizada com placeholder
- ✅ Code splitting automático
- ✅ Consolidação de estilos duplicados

### 📱 **Melhorias de UX/UI**
- ✅ Componente Hero refatorado
- ✅ Seções organizadas em componentes menores
- ✅ Animações suaves com Framer Motion
- ✅ Loading states aprimorados

### 🔍 **SEO e Acessibilidade**
- ✅ Componente SEO com meta tags dinâmicas
- ✅ Structured data (Schema.org)
- ✅ Open Graph e Twitter Cards
- ✅ Alt texts para imagens
- ✅ URLs canônicas

## 📁 Estrutura do Projeto

```
Apenas-um-Catolico/
├── public/
│   ├── images/
│   │   ├── heroes/          # Imagens de background
│   │   ├── logos/           # Logotipos
│   │   └── santos/          # Imagens dos santos
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.js
│   │   ├── OptimizedImage.js
│   │   ├── SEO.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── HeroSection.js
│   │   │   ├── BiblicalSection.js
│   │   │   ├── SantosSection.js
│   │   │   └── ResourcesSection.js
│   │   └── ...
│   ├── context/
│   │   └── ThemeContext.js
│   └── styles/
│       ├── GlobalStyles.js
│       └── theme.js
├── .eslintrc.js
├── .prettierrc
└── package.json
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Styled Components** - Estilização
- **React Router DOM** - Roteamento
- **Framer Motion** - Animações
- **React Helmet** - SEO
- **React Icons** - Ícones
- **ESLint & Prettier** - Qualidade de código

## 📦 Scripts Disponíveis

```bash
# Iniciar desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test

# Linting
npm run lint
npm run lint:fix

# Formatação de código
npm run format
```

## 🎯 Funcionalidades

### Páginas Principais
- **Início**: Hero section com informações bíblicas e apresentação dos santos
- **Santos**: Galeria dos santos com biografias detalhadas
- **São Francisco**: Página dedicada com história, curiosidades e oração
- **Orações**: Coleção de orações católicas
- **Blog**: Artigos e reflexões espirituais
- **Sobre**: Informações sobre o projeto

### Componentes Reutilizáveis
- **OptimizedImage**: Carregamento otimizado com placeholder
- **SEO**: Meta tags e structured data automáticos
- **ErrorBoundary**: Tratamento de erros com interface amigável
- **LoadingScreen**: Tela de carregamento animada

## 🌟 Destaques Técnicos

### Performance
- Lazy loading de rotas e componentes
- Otimização automática de imagens
- Code splitting por rota
- Memoização de componentes pesados

### SEO
- Meta tags dinâmicas por página
- Structured data (JSON-LD)
- Open Graph completo
- Sitemap automático

### Acessibilidade
- Navegação por teclado
- Alt texts descritivos
- Contraste adequado
- ARIA labels

### Manutenibilidade
- Código organizado em módulos
- Configuração de linting
- Error boundaries para robustez
- Documentação completa

## 🚀 Deploy

O projeto está configurado para deploy automático no Vercel:

1. Push para a branch main
2. Deploy automático no Vercel
3. URL: https://apenas-um-catolico.vercel.app

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🙏 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugestões e melhorias.

---

**Desenvolvido com ❤️ para a comunidade católica**