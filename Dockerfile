FROM node:18-alpine

# Install Docker CLI
RUN apk add --no-cache docker-cli docker-compose

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate lab folders
RUN npm run generate-labs

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]