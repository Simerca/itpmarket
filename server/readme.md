## Prérequis

*   Installer Docker et Docker Compose sur votre machine
*   Cloner ce dépôt Git sur votre machine

## Installation

1.  Construire l'image Docker de l'application en exécutant la commande suivante dans le répertoire du projet:

        $ make build

2.  Modifier le fichier `.env` pour définir les variables d'environnement de l'application
3.  Démarrer l'application avec Docker Compose en exécutant la commande suivante dans le répertoire du projet:

        $ docker-compose up

## Utilisation

L'application est maintenant en cours d'exécution et accessible via le port 5000\. Vous pouvez accéder à l'API de l'application en utilisant l'URL suivante:

    http://localhost:5000/api

Pour plus d'informations sur l'utilisation de l'API, veuillez consulter la documentation [API Postman](https://documenter.getpostman.com/view/21567611/2s8Z75UAvv).

## Mise à jour

Pour mettre à jour l'application, procédez comme suit:

1.  Mettre à jour le code de l'application dans le dépôt Git
2.  Construire une nouvelle image Docker en exécutant la commande suivante dans le répertoire du projet:

        $ make build

3.  Redémarrer l'application avec Docker Compose en exécutant la commande suivante dans le répertoire du projet:

        $ docker-compose up