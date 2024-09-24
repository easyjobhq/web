# Step 1: Build Stage
FROM node:18-alpine AS builder
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application
COPY . .
# Build the application
RUN npm run build
# Step 2: Production Stage
FROM node:18-alpine AS production
# Set working directory
WORKDIR /app
# Copy only the build output and necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
# Install only production dependencies
RUN npm install --only=production
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]