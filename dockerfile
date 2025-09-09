FROM node:20.17.0-alpine3.20
RUN addgroup dev && adduser -S -G dev victor
USER victor
WORKDIR /app/
COPY --chown=victor package*.json .
RUN npm install
COPY --chown=victor . .
EXPOSE 3000
CMD ["npm", "start"]
