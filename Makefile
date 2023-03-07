start:
	make build
	make up

build:
	docker-compose build

up:
	docker-compose down
	docker-compose up > logs.txt