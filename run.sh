#! /bin/bash
docker compose down
docker compose create --build
docker compose up