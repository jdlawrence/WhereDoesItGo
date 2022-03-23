from flask import Flask
from flask_graphql import GraphQLView
from markupsafe import escape
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from schema import schema

CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)
