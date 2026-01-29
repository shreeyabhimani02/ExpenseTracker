# Stage 1: Build React App
FROM node:20-alpine AS build

WORKDIR /app

# Copy only required files (avoids COPY . . warning)
COPY package.json ./
COPY package-lock.json ./



COPY vite.config.js ./
COPY index.html ./
COPY src ./src
COPY public ./public

RUN npm install && npm run build

# Stage 2: Serve with Nginx Securely
FROM nginx:alpine

# Remove default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Fix permissions for nginx runtime
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/run \
    && touch /var/run/nginx.pid \
    && chown -R appuser:appgroup /var/run/nginx.pid

# Switch user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
