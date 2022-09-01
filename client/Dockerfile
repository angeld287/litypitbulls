FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --production
# Copy app files
COPY . .
# Build the app
RUN npm build

RUN cat /app/build/index.html

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Expose port
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh
RUN /usr/share/nginx/html/env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]