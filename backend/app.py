from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///grocery.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Set the path to your frontend's build directory
# frontend_folder = os.path.join(os.getcwd(), "frontend", "build")

# @app.route("/", defaults={"filename": "index.html"})
# @app.route("/<path:filename>")
# def index(filename):
#     return send_from_directory(frontend_folder, filename)


import routes

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
