import hashlib
import json
from flask import Flask, request, render_template, Response
from flask_cors import CORS
import requests
import time

class Block:
  def __init__(self, data, previous_hash):
    self.timestamp = time.time()
    self.data = data
    self.previous_hash = previous_hash
    self.hash = self.calculate_hash()

  def calculate_hash(self):
    block_string = json.dumps(self.__dict__, sort_keys=True).encode()
    return hashlib.sha256(block_string).hexdigest()
    

class Blockchain:
  def __init__(self):
    self.chain = []
    self.nodes = set()
    self.create_genesis_block()

  def create_genesis_block(self):
    self.add_block(Block("Genesis block", "0"))

  def add_block(self, block):
    self.chain.append(block)
    
  def get_last_block(self):
    return self.chain[-1]

  def add_node(self, address):
    self.nodes.add(address)

  def replace_chain(self):
    longest_chain = None
    max_length = len(self.chain)
    for node in self.nodes:
      response = requests.get(f"{node}/show_chain")
      if response.status_code == 200:
        length = response.json()["length"]
        chain = response.json()["chain"]
        if length > max_length and self.is_valid_chain(chain):
          max_length = length
          longest_chain = chain
    if longest_chain:
      self.chain = [Block(block["data"], block["previous_hash"]) for block in longest_chain ]
      return True
    return False

  def is_valid_chain(self, chain):
    last_block = chain[0]
    current_index = 1
    while current_index < len(chain):
      block = chain[current_index]
      if block["previous_hash"] != last_block["hash"]:
        return False
      last_block = block
      current_index += 1
    return True

# Création de l'application Flask
app = Flask(__name__)

CORS(app)

# Création de la chaîne de blocs
blockchain = Blockchain()

# Définition de l'URL de l'API pour ajouter un nouveau bloc à la chaîne de blocs
@app.route("/add_block", methods=["POST"])
def add_block():
  data = request.get_json()["data"]
  blockchain.add_block(Block(data, blockchain.get_last_block().hash))
  response = {"message": "Block ajouté à la chaîne de blocs"}
  return json.dumps(response), 201


# Définition de l'URL de l'API pour afficher la chaîne de blocs
@app.route("/show_chain", methods=["GET"])
def show_chain():
  response = []
  for block in blockchain.chain:
    print('block is')
    print(block)
    block_info = {
      "timestamp": block.timestamp,
      "data": block.data,
      "previous_hash": block.previous_hash,
      "hash": block.hash
    }
    response.append(block_info)
  return json.dumps({"chain": response, "length":len(response)}), 200

@app.route("/add_node", methods=["POST"])
def add_node():
  data = request.get_json()
  nodes = data.get("nodes")
  if nodes is None:
    return "Erreur: aucun noeud spécifié", 400
  for node in nodes:
    blockchain.add_node(node)
  response = {
    "message": "Noeuds ajoutés",
    "total_nodes": list(blockchain.nodes),
  }
  return json.dumps(response), 201

# Définition de l'URL de l'API pour synchroniser les noeuds
@app.route("/sync_nodes", methods=["GET"])
def sync_nodes():
  replaced = blockchain.replace_chain()

  if replaced:
    response = {"message": "La chaîne de blocs a été remplacée par la chaîne la plus longue"}
  else:
    response = {"message": "La chaîne de blocs est déjà la plus longue"}
  return json.dumps(response), 200

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/chain")
def show_chain_text():
  data = [block.data for block in blockchain.chain]
  response = "\n".join(data)
  return Response(response, mimetype="text/plain")

# Exécution de l'application
app.run(host="0.0.0.0", port=5001)
