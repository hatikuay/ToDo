import json
from flask_testing import TestCase
from my_app import create_app, db
from my_app.models.models import Todo
import logging

class TestTodoBlueprint(TestCase):

    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    TESTING = True

    def create_app(self):
        # Attempt to create the Flask application
        app = create_app()
        
        # Check if the app is None
        if app is None:
            logging.error("Failed to create the Flask application.")
        else:
            logging.info("Flask application created successfully.")
        
        return app

    def setUp(self):
        if self.app is None:
            self.fail("The Flask application was not created.")
        
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_create_todo(self):
        # Test creating a new todo
        response = self.client.post(
            "/todos",
            data=json.dumps({"title": "Test Todo"}),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("Todo item created successfully", response.json["message"])

    def test_get_todos(self):
        # Test retrieving all todos
        # Prepopulate with a test todo
        new_todo = Todo(title="Test Todo", completed=False)
        db.session.add(new_todo)
        db.session.commit()

        response = self.client.get("/todos")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]["title"], "Test Todo")

    def test_update_todo(self):
        # Test updating an existing todo
        new_todo = Todo(title="Old Title", completed=False)
        db.session.add(new_todo)
        db.session.commit()

        response = self.client.put(
            f"/todos/{new_todo.id}",
            data=json.dumps({"title": "New Title", "completed": True}),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("Todo item updated successfully", response.json["message"])

        updated_todo = Todo.query.get(new_todo.id)
        self.assertEqual(updated_todo.title, "New Title")
        self.assertEqual(updated_todo.completed, True)

    def test_delete_todo(self):
        # Test deleting a todo
        new_todo = Todo(title="Test Todo", completed=False)
        db.session.add(new_todo)
        db.session.commit()

        response = self.client.delete(f"/todos/{new_todo.id}")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Todo item deleted successfully", response.json["message"])
        self.assertIsNone(Todo.query.get(new_todo.id))

if __name__ == '__main__':
    import unittest
    unittest.main()
