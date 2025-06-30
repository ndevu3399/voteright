from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Poll, Choice, Vote

poll_bp = Blueprint("polls", __name__)

# ───────── Public poll list ─────────
@poll_bp.route("/", methods=["GET"])
def list_polls():
    polls = Poll.query.order_by(Poll.created_at.desc()).all()
    out = []
    for p in polls:
        out.append({
            "id":      p.id,
            "title":   p.title,
            "choices": [{"id": c.id, "text": c.text} for c in p.choices],
        })
    return jsonify(out)

# ───────── Single poll ─────────
@poll_bp.route("/<int:poll_id>", methods=["GET"])
def single_poll(poll_id):
    p = Poll.query.get_or_404(poll_id)
    return jsonify({
        "id":      p.id,
        "title":   p.title,
        "choices": [{"id": c.id, "text": c.text} for c in p.choices],
    })

# ───────── Vote (user) ─────────
@poll_bp.route("/<int:poll_id>/vote", methods=["POST"])
@jwt_required()
def vote(poll_id):
    data = request.get_json()
    choice_id = data.get("choice_id")
    user_id = get_jwt_identity()

    # 1. Ensure poll exists
    poll = Poll.query.get_or_404(poll_id)

    # 2. Prevent double voting
    existing_vote = Vote.query.filter_by(user_id=user_id, poll_id=poll_id).first()
    if existing_vote:
        return jsonify({"msg": "You have already voted"}), 400

    # 3. Ensure choice belongs to the poll
    choice = Choice.query.filter_by(id=choice_id, poll_id=poll_id).first()
    if not choice:
        return jsonify({"msg": "Invalid choice"}), 400

    # 4. Save vote
    vote = Vote(user_id=user_id, poll_id=poll_id, choice_id=choice_id)
    db.session.add(vote)
    db.session.commit()

    return jsonify({"msg": "Vote submitted"}), 201



# ───────── Create poll (admin only) ─────────
@poll_bp.route("", methods=["POST"])
@jwt_required()
def create_poll():
    # role check happens in @admin_required inside admin blueprint (imported lazily)
    from app.admin import admin_required
    admin_gate = admin_required(lambda: None)  # create decorator instance
    resp = admin_gate()
    if resp is not None:  # means it aborted / returned
        return resp

    data    = request.get_json()
    title   = data.get("title")
    choices = data.get("choices", [])

    if not title or len(choices) < 2:
        return jsonify({"msg": "Title and at least two choices required"}), 400

    poll = Poll(title=title)
    db.session.add(poll)
    db.session.flush()        # we now have poll.id

    for text in choices:
        db.session.add(Choice(text=text, poll_id=poll.id))

    db.session.commit()
    return jsonify({"msg": "Poll created", "poll_id": poll.id}), 201
