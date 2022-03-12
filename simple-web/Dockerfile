# Specify base image
FROM node:alpine
 
WORKDIR /usr/app

# install some dependencies
COPY ./ ./
RUN npm install



# Default command
CMD ["npm", "start"]