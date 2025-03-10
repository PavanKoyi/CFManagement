# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production --base-href /CFManagement/

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/cfm /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create .nojekyll file
RUN touch /usr/share/nginx/html/.nojekyll

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
