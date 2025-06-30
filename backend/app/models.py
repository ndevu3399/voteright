# models.py

from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default="user")

    votes = db.relationship("Vote", backref="user", lazy=True)

class Poll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    choices = db.relationship("Choice", backref="poll", lazy=True)

class Choice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    poll_id = db.Column(db.Integer, db.ForeignKey("poll.id"), nullable=False)

    votes = db.relationship("Vote", backref="choice", lazy=True)

class Vote(db.Model):
    __tablename__ = "votes"

    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    poll_id    = db.Column(db.Integer, db.ForeignKey("polls.id"), nullable=False)
    choice_id  = db.Column(db.Integer, db.ForeignKey("choices.id"), nullable=False)

    user   = db.relationship("User", back_populates="votes")
    poll   = db.relationship("Poll", back_populates="votes")
    choice = db.relationship("Choice")

