FROM node:16.3.0-alpine as build
#ARG NPM_TOKEN=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

# Copy source code
COPY . /app/
WORKDIR app

# Install dependencies
#RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
RUN npm i

CMD ["npm", "start"]
