from flask import Blueprint, request, jsonify
from my_app import db
from my_app.models.models import Todo, User

todo_blueprint = Blueprint("todo", __name__)


@todo_blueprint.route("/todos", methods=["POST"])
def create_todo():
    data = request.get_json()
    new_todo = Todo(title=data["title"], completed=False)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({"message": "Todo item created successfully"}), 201


@todo_blueprint.route("/todos", methods=["GET"])
def get_todos():
    todos = Todo.query.all()
    return (
        jsonify(
            [
                {"id": todo.id, "title": todo.title, "completed": todo.completed}
                for todo in todos
            ]
        ),
        200,
    )


@todo_blueprint.route("/todos/<int:id>", methods=["PUT"])
def update_todo(id):
    todo = Todo.query.get_or_404(id)
    data = request.get_json()
    todo.title = data.get("title", todo.title)
    todo.completed = data.get("completed", todo.completed)
    db.session.commit()
    return jsonify({"message": "Todo item updated successfully"}), 200


@todo_blueprint.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "Todo item deleted successfully"}), 200


@todo_blueprint.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201
