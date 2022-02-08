
  
FROM node AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY ./prisma ./prisma

ENV DATABASE_URL="file:./dev.db"

EXPOSE 3000
RUN npx prisma migrate dev --name init
CMD [ "npm", "run", "start:prod" ]
