from app import db

class Item(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  price = db.Column(db.String(20), nullable=False)
  company = db.Column(db.String(20), nullable=False)
  store = db.Column(db.String(10), nullable=False)


  def to_json(self):
    return {
      "id":self.id,
      "name":self.name,
      "price":self.price,
      "company":self.company,
      "store":self.store
    }

 