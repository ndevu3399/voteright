from functools import wraps
from flask import Blueprint, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Poll

admin_bp = Blueprint("admin", __name__)

# ───────── decorator ─────────
def admin_required(fn):
    @wraps(fn)
    @jwt_required()  # ensures token exists
    def wrapper(*args, **kwargs):
        uid  = int(get_jwt_identity())
        user = User.query.get(uid)
        if not user or user.role != "admin":
            abort(403)
        return fn(*args, **kwargs)
    return wrapper

# ───────── /users ─────────
@admin_bp.route("/users", methods=["GET"])
@admin_required
def list_users():
    users = User.query.order_by(User.id).all()
    return jsonify([{"id": u.id, "username": u.username, "role": u.role} for u in users])

# ───────── /results ─────────
@admin_bp.route("/results", methods=["GET"])
@admin_required
def poll_results():
    polls = Poll.query.all()
    out   = []
    for p in polls:
        out.append({
            "poll":   p.title,
            "totals": {c.text: len(c.votes) for c in p.choices},
        })
    return jsonify(out)
