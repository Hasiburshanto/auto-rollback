# Use Node.js 16
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy app code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "app.js"]

