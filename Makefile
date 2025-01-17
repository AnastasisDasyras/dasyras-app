# Makefile for Laravel Sail Commands

# The name of the Docker container
CONTAINER_NAME = dasyras-app-laravel.test-1

# Make sure to run Sail commands with './vendor/bin/sail'
SAIL = ./vendor/bin/sail

# Start the Docker containers
up:
	$(SAIL) up -d

# Stop the Docker containers
down:
	$(SAIL) down

# Restart the Docker containers
restart:
	$(SAIL) restart

# Build the Docker containers (use this if you modify the Dockerfile)
build:
	$(SAIL) build --no-cache

# Run Composer install in the container
composer-install:
	$(SAIL) composer install

# Run Artisan migrations
migrate:
	$(SAIL) artisan migrate

# Seed the database with Artisan
db-seed:
	$(SAIL) artisan db:seed

# Run the test suite
test:
	$(SAIL) artisan test

# Open a shell in the container
shell:
	$(SAIL) shell

# Run a specific Artisan command
artisan:
	$(SAIL) artisan $(arg)

# Run the Laravel development server
serve:
	$(SAIL) artisan serve

# Run PHPUnit tests
phpunit:
	$(SAIL) vendor/bin/phpunit

# Install frontend dependencies (npm install)
npm-install:
	$(SAIL) npm install

# Run npm dev (for frontend development)
npm-dev:
	$(SAIL) npm run dev

# Run npm production (for production build)
npm-prod:
	$(SAIL) npm run production

# Check Laravel Sail version
version:
	$(SAIL) --version

# Create a new Laravel project (with Composer)
new-project:
	$(SAIL) composer create-project --prefer-dist laravel/laravel $(project-name)

# Open the application in the browser (assuming default Laravel Sail port 80)
open:
	open http://localhost:80

# Execute Xdebug-related commands if needed (optional)
xdebug-enable:
	$(SAIL) php -r "ini_set('xdebug.mode', 'debug');"

xdebug-disable:
	$(SAIL) php -r "ini_set('xdebug.mode', 'off');"
