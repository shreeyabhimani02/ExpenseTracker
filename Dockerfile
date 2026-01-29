FROM node:20-alpine
# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY src ./src
COPY public ./public

Copying recursively might inadvertently add sensitive data to the container. Make sure it is safe here.
# Change ownership
RUN chown -R appuser:appgroup /app
# Switch to non-root user
USER appuser
EXPOSE 3000
CMD ["npm", "start"]
