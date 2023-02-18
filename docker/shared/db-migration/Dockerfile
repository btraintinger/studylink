FROM node:18

WORKDIR /app

RUN npm install prisma

COPY ./prisma  .

CMD ["npx" ,"prisma","db","push","--skip-generate"]