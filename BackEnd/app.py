from flask import Flask
from flask_graphql import GraphQLView
from markupsafe import escape
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from db import *
from schema import schema

app = Flask(__name__)
CORS(app)

db.drop_all()
db.create_all()

jamil = User(username='Jamil', email='jamil@gmail.com')
akeem = User(username='Akeem', email='akeem@gmail.com')
kyle = User(username='Kyle', email='kyle@gmail.com')

# db.session.add(jamil)
# db.session.commit()

db.session.add_all([jamil, akeem, kyle])
db.session.commit()

allot1= Allotment(name='Sleep', hours=57.8, user=jamil)
allot2= Allotment(name='Work', hours=47.2, user=jamil)
allot3= Allotment(name='Sleep', hours=53.57, user=akeem)
allot4= Allotment(name='DJing', hours=16.5, user=akeem)
allot5= Allotment(name='Sleep', hours=56.8, user=kyle)
allot6= Allotment(name='Hooping', hours=4.3, user=kyle)
allot7= Allotment(name='NBA games', hours=4.6, user=kyle)

db.session.add_all([allot1, allot2, allot3, allot4, allot5, allot6, allot7])
db.session.commit()


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
