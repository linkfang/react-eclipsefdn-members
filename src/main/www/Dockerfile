# pull official base image
FROM node:12.22.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./
RUN npm install

# start app
CMD ["npm", "start"]    