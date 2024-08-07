FROM node:alpine AS node-builder

WORKDIR /backend

COPY package*.json .
RUN npm install

COPY tsconfig.json .
COPY src/*.ts src/
COPY src/utilities/*.ts src/utilities/
COPY src/modules/AuthModule/*.ts src/modules/AuthModule/
COPY src/modules/ChatModule/*.ts src/modules/ChatModule/
COPY src/modules/LeaderBoardModule/*.ts src/modules/LeaderBoardModule/
COPY src/modules/StateModule/*.ts src/modules/StateModule/
COPY src/modules/MatchModule/*.ts src/modules/MatchModule/
COPY src/modules/ConfigurationModule/*.ts src/modules/ConfigurationModule/

# COPY src/modules/StateModule/*.ts src/modules/StateModule/
RUN npx tsc

FROM registry.heroiclabs.com/heroiclabs/nakama:3.22.0

COPY --from=node-builder /backend/build/*.js /nakama/data/modules/build/
COPY local.yml /nakama/data/