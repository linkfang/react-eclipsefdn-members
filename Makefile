compile-java: validate-spec;
	mvn clean compile package
compile-react: install-react;
	yarn --cwd src/main/www build
compile: clean compile-react compile-java;
	docker build -f src/main/docker/Dockerfile.jvm -t eclipsefdn/membership-rest-api .
clean:;
	mvn clean
	rm -rf src/main/resources/META-INF/*
install-react:;
	yarn --cwd src/main/www install --frozen-lockfile
validate-spec: install-react;
	yarn --cwd src/main/www test-spec


