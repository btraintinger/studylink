FROM node:18-alpine

WORKDIR /app

COPY ../../../package.json ./
COPY ../../../package-lock.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npx","prisma","db", "push","&&","npm", "run", "start"]