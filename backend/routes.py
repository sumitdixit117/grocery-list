from app import app, db
from flask import request, jsonify
from models import Item

# Get all items
@app.route("/api/items",methods=["GET"])
def get_items():
  items = Item.query.all() 
  result = [item.to_json() for item in items]
  return jsonify(result)

# Create an item
@app.route("/api/items",methods=["POST"])
def create_item():
  try:
    data = request.json

    # Validations
    required_fields = ["name","price","company","store"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    price = data.get("price")
    company = data.get("company")
    store = data.get("store")

    new_item = Item(name=name, price=price, company=company, store=store)

    db.session.add(new_item) 
    db.session.commit()

    return jsonify(new_item.to_json()), 201
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
# Delete an item
@app.route("/api/items/<int:id>",methods=["DELETE"])
def delete_item(id):
  try:
    item = Item.query.get(id)
    if item is None:
      return jsonify({"error":"Item not found"}), 404
    
    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg":"Item deleted!"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
  
# Update item's details
@app.route("/api/items/<int:id>",methods=["PATCH"])
def update_item(id):
  try:
    item = Item.query.get(id)
    if item is None:
      return jsonify({"error":"Item not found"}), 404
    
    data = request.json

    item.name = data.get("name",item.name)
    item.price = data.get("price",item.price)
    item.company = data.get("company",item.company)
    item.store = data.get("store",item.store)

    db.session.commit()
    return jsonify(item.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500

