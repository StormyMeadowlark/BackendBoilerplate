# Use official Node.js LTS image
FROM node:22.1.0

# Create app directory
WORKDIR /app

# Copy package.json files first
COPY package*.json ./

# Install all dependencies (including dev for nodemon support in dev mode)
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the project
COPY . .

# Create logs directory (optional but useful)
RUN mkdir -p /app/logs && chmod -R 777 /app/logs

# Set environment vars (overrideable at runtime)
ENV PORT=2019
ENV NODE_ENV=production

# Expose port
EXPOSE 2019

# Default: production mode
CMD ["npm", "start"]
