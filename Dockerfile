# Base Image
FROM node:12-alpine as base

# Directory in our container
WORKDIR /app

# Copy/Install dependencies into our directory
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run test
EXPOSE 3000
CMD ["npm", "start"]