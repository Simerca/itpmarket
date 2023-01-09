FROM python:latest

# Créer un répertoire pour l'application
RUN mkdir /app

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour l'application
COPY requirements.txt /app
COPY app.py /app
COPY templates/index.html /app/templates/index.html

# Installer les dépendances de l'application
RUN pip install -r requirements.txt

# Exposer le port de l'application
EXPOSE 5000

# Lancer l'application
CMD ["python", "app.py"]
