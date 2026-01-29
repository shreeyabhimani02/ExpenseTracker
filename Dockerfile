# Use Node LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port (example 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
