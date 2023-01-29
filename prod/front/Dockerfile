FROM node
WORKDIR /app
COPY ./McHacks/package.json .
RUN npm i
COPY ./McHacks/ .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]

