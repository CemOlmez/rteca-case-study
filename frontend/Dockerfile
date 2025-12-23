FROM node:20-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
