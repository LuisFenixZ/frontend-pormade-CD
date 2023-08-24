# Usando a imagem Node.js como base
FROM node:18-bullseye

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando os arquivos de configuração do pacote do projeto
COPY package.json package-lock.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando o código do frontend para o contêiner
COPY . .

# Expondo a porta do servidor do frontend
EXPOSE 3000

# Comando para iniciar o servidor do frontend
CMD [ "npm", "start" ]
