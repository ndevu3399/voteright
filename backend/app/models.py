from . import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default="user")

    votes = db.relationship("Vote", back_populates="user")


class Poll(db.Model):
    __tablename__ = "polls"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    choices = db.relationship("Choice", back_populates="poll")
    votes   = db.relationship("Vote", back_populates="poll")


class Choice(db.Model):
    __tablename__ = "choices"

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    poll_id = db.Column(db.Integer, db.ForeignKey("polls.id"), nullable=False)

    poll  = db.relationship("Poll", back_populates="choices")
    votes = db.relationship("Vote", back_populates="choice")


class Vote(db.Model):
    __tablename__ = "votes"

    id        = db.Column(db.Integer, primary_key=True)
    user_id   = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    poll_id   = db.Column(db.Integer, db.ForeignKey("polls.id"), nullable=False)
    choice_id = db.Column(db.Integer, db.ForeignKey("choices.id"), nullable=False)

    user   = db.relationship("User", back_populates="votes")
    poll   = db.relationship("Poll", back_populates="votes")
    choice = db.relationship("Choice", back_populates="votes")
