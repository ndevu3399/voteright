# routes.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Poll, Choice, Vote
from app.schemas import PollSchema

poll_bp = Blueprint("polls", __name__)

poll_schema = PollSchema()
polls_schema = PollSchema(many=True)

@poll_bp.route("/", methods=["GET"])
def get_polls():
    polls = Poll.query.all()
    return polls_schema.jsonify(polls)

@poll_bp.route("/<int:poll_id>", methods=["GET"])
def get_poll(poll_id):
    poll = Poll.query.get_or_404(poll_id)
    return poll_schema.jsonify(poll)

@poll_bp.route("/<int:poll_id>/vote", methods=["POST"])
@jwt_required()
def vote(poll_id):
    user_id = int(get_jwt_identity())

    poll = Poll.query.get_or_404(poll_id)
    data = request.get_json()
    choice_id = data.get("choice_id")

    choice = Choice.query.filter_by(id=choice_id, poll_id=poll_id).first()
    if not choice:
        return jsonify({"msg": "Invalid choice"}), 400

    # Check if user already voted on this poll
    existing_vote = Vote.query.join(Choice).filter(
        Vote.user_id == user_id,
        Choice.poll_id == poll_id
    ).first()

    if existing_vote:
        return jsonify({"msg": "You already voted in this poll"}), 400

    vote = Vote(user_id=user_id, choice_id=choice_id)
    db.session.add(vote)
    db.session.commit()

    return jsonify({"msg": "Vote submitted"})


@poll_bp.route("", methods=["POST"])
@jwt_required()
def create_poll():
    user_id = int(get_jwt_identity())

    data = request.get_json()
    title = data.get("title")
    choices = data.get("choices", [])

    if not title or not choices:
        return jsonify({"msg": "Title and at least one choice are required"}), 400

    poll = Poll(title=title)
    db.session.add(poll)
    db.session.flush()

    for choice_text in choices:
        choice = Choice(text=choice_text, poll_id=poll.id)
        db.session.add(choice)

    db.session.commit()
    return jsonify({"msg": "Poll created"}), 201