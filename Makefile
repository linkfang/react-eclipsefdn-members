compile-java: validate-spec;
	mvn clean compile package
compile-react: install-react;
	yarn --cwd src/main/www build
compile: clean compile-react compile-java;
	docker-compose build
clean:;
	mvn clean
	rm -rf src/main/resources/META-INF/*
install-react:;
	yarn --cwd src/main/www install --frozen-lockfile
validate-spec: install-react;
	yarn --cwd src/main/www test-spec
generate-cert:;
	rm -rf certs && mkdir -p certs
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/www.rem.docker.key -out certs/www.rem.docker.crt
make compile-start: compile;
	docker-compose down
	docker-compose up