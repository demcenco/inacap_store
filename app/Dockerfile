
FROM node:16 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:16
WORKDIR /app
COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules


# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000
# the command that starts our app
CMD ["node", "index.js"]