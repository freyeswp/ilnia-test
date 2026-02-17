FROM node:18

WORKDIR /app

RUN npm install -g create-react-app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
