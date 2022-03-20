from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
# check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Column, String, Float, Integer, Model = db.Column, db.String, db.Float, db.Integer, db.Model
relationship, ForeignKey = db.relationship, db.ForeignKey

class User(Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)

    allotments = relationship('Allotment', backref="user")

    def __repr__(self):
        return '<User %r>' % self.username

class Allotment(Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    hours = Column(Float)
    user_id = Column(Integer, ForeignKey('user.id'))

    def __repr__(self):
        return '<Allotment %r>' % self.name
