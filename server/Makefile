# Nom de l'image Docker
IMAGE_NAME = itpmarket

# Identifiant du dépôt Git
GIT_HASH = $(shell git rev-parse --short HEAD)

# Nom de l'image Docker complet, avec le registre de conteneurs de GitHub
DOCKER_IMAGE_NAME = ghcr.io/simerca/$(IMAGE_NAME)

# Commandes Docker
DOCKER = docker
DOCKER_BUILD = $(DOCKER) build
DOCKER_TAG = $(DOCKER) tag
DOCKER_PUSH = $(DOCKER) push

# Construire l'image Docker
build:
	$(DOCKER_BUILD) -t $(DOCKER_IMAGE_NAME):latest .
	$(DOCKER_TAG) $(DOCKER_IMAGE_NAME):latest $(DOCKER_IMAGE_NAME):$(GIT_HASH)

# Pousser l'image Docker sur Docker Hub
push:
	$(DOCKER_PUSH) $(DOCKER_IMAGE_NAME):latest
	$(DOCKER_PUSH) $(DOCKER_IMAGE_NAME):$(GIT_HASH)