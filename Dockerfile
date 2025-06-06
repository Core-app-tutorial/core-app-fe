FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g bun
RUN bun i

COPY . .

RUN bun run build; 

EXPOSE 3000

CMD ["bun", "start"]



