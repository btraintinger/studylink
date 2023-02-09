FROM node:18-alpine

WORKDIR /app

RUN npm install prisma

COPY ./prisma  .

CMD ["npx" ,"prisma","db","push"]