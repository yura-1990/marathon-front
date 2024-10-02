# Use the node image from official Docker Hub
FROM node:20.10.0-alpine
# set the working directory
WORKDIR /app
# Copy the working directory in the container
COPY package*.json ./
# Install the project dependencies
RUN npm install
# Copy the rest of the project files to the container
COPY . .
# Build the Vue.js application to the production mode to dist folder

ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]
#RUN npm run build

