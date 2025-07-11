# 🌐 Configurar Domínio Customizado para Desenvolvimento

## 📋 **Passo 1: Configurar Arquivo Hosts**

### **Windows:**
1. Abra o **Bloco de Notas como Administrador**
2. Abra o arquivo: `C:\Windows\System32\drivers\etc\hosts`
3. Adicione esta linha no final:
```
127.0.0.1    apenasumcatolico.local
```
4. Salve o arquivo

### **Mac/Linux:**
```bash
sudo nano /etc/hosts
# Adicionar a linha:
127.0.0.1    apenasumcatolico.local
```

## 📋 **Passo 2: Criar arquivo .env**

Crie um arquivo `.env` na raiz do projeto com:
```env
HOST=apenasumcatolico.local
PORT=3000
HTTPS=false
BROWSER=none
```

## 📋 **Passo 3: Reiniciar o Servidor**

```bash
# Parar o servidor atual (Ctrl+C)
# Iniciar novamente:
npm start
```

## 🎯 **Resultado:**
- **Antes:** `http://localhost:3000`
- **Depois:** `http://apenasumcatolico.local:3000`

## 🔒 **Para HTTPS Local (Opcional):**

### **Instalar mkcert:**
```bash
# Windows (chocolatey)
choco install mkcert

# Mac
brew install mkcert

# Configurar certificado
mkcert -install
mkcert apenasumcatolico.local
```

### **Configurar .env para HTTPS:**
```env
HOST=apenasumcatolico.local
PORT=3000
HTTPS=true
SSL_CRT_FILE=./apenasumcatolico.local.pem
SSL_KEY_FILE=./apenasumcatolico.local-key.pem
```

## 🎯 **Resultado com HTTPS:**
- **URL:** `https://apenasumcatolico.local:3000`

## 🔧 **Scripts Disponíveis:**
- `npm start` - Usa domínio customizado
- `npm run start:default` - Usa localhost padrão

## 📝 **Notas:**
- O domínio customizado só funciona na sua máquina
- Para produção, use um domínio real
- O arquivo hosts precisa ser editado como administrador 