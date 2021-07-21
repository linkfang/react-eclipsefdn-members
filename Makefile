compile-java: validate-spec;
	mvn compile package
compile-java-quick: validate-spec;
	mvn compile package -DskipTests
compile-react: install-react;
	yarn --cwd src/main/www build
compile: clean compile-react compile-java;
compile-quick: clean compile-react compile-java-quick;
clean:;
	mvn clean
	rm -rf src/main/resources/META-INF/*
install-react:;
	yarn --cwd src/main/www install --frozen-lockfile
validate-spec: install-react;
	yarn --cwd src/main/www generate-json-schema
	yarn --cwd src/main/www test-spec
generate-cert:;
	rm -rf certs && mkdir -p certs
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/www.rem.docker.key -out certs/www.rem.docker.crt
compile-start: compile-quick;
	docker-compose down
	docker-compose build
	docker-compose up
start-spec: validate-spec;
	yarn --cwd src/main/www start-spec