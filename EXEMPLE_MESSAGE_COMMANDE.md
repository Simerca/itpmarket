## Exemple de message compressé pour traiter une commande de roche de Mars à destination de la Terre
Le message compressé est au format de clé-valeur et utilise des codes abrégés pour certaines informations. Le message est séparé en plusieurs parties par des "|" (barres verticales).

Voici la signification de chaque partie du message:

- HDR: En-tête du message. Indique le début du message.
- CMD: Type de message. Indique que le message est une commande.
- ROCK: Type de produit. Indique que le produit est de la roche.
- MAR: Origine du produit. Indique que la roche vient de Mars.
- EARTH: Destination du produit. Indique que la roche doit être livrée sur Terre.
- 10KG: Quantité de produit. Indique la quantité de roche à livrer.
- BASALT: Type de roche. Indique le type de roche à livrer.
- 12-25-23: Date de livraison souhaitée. Indique la date souhaitée pour la livraison de la roche.
- RESEARCH CTR: Expéditeur. Indique qui envoie la commande.
- 123 SCIENCE ST: Adresse de livraison. Indique l'adresse de livraison de la roche.
- CITY: Ville de livraison. Indique la ville de livraison de la roche.
- STATE: État de livraison. Indique l'état de livraison de la roche.
- ZIP: Code postal de livraison. Indique le code postal de livraison de la roche.


## Script de décodage du message
Le script de décodage prend en entrée le message compressé et renvoie un dictionnaire contenant toutes les informations décodées.

Voici comment utiliser le script:

```python
from decode import decode_message

# Décodage du message compressé
decoded_message = decode_message("HDR:CMD|ROCK|MAR|EARTH|10KG|BASALT|12-25-23|RESEARCH CTR|123 SCIENCE ST|CITY|STATE|ZIP")

# Affichage du dictionnaire de message décodé
print(decoded_message)
```
Le dictionnaire de message décodé aura la forme suivante:

```json
{
  "header": "HDR",
  "type": "CMD",
  "origin": "MAR",
  "destination": "EARTH",
  "quantity": "10KG",
  "rock_type": "BASALT",
  "delivery_date": "12-25-23",
  "sender": "RESEARCH CTR",
  "delivery_address": "123 SCIENCE ST, CITY, STATE"
}
```