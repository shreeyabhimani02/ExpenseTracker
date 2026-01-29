# Stage 1: Build React App
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY index.html ./
COPY vite.config.* ./
COPY src ./src
COPY public ./public

RUN npm run build


# Stage 2: Serve with Nginx (Non-root)
FROM nginx:alpine

# Create non-root user
RUN addgroup -S nginxgroup && adduser -S nginxuser -G nginxgroup

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Change ownership of nginx files
RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html \
    && chown -R nginxuser:nginxgroup /var/cache/nginx \
    && chown -R nginxuser:nginxgroup /var/run

# Switch to non-root user
USER nginxuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
