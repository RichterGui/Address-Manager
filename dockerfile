FROM node:22.2.0

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/addressmanager/

WORKDIR $HOME/addressmanager

RUN npm install

COPY . $HOME/addressmanager

CMD ["npm", "start"]