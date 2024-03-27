from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def create_app():

    app = Flask(__name__)
    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todos.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    from my_app.models.models import Todo
    db.init_app(app)

    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("Database tables created.")

    from my_app.api.todo_api import todo_blueprint

    app.register_blueprint(todo_blueprint)

    return app
