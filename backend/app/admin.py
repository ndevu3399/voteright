from functools import wraps
from flask import Blueprint, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Poll

admin_bp = Blueprint("admin", __name__)

# ───── decorator ────────────────────────────────────
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        uid  = int(get_jwt_identity())
        user = User.query.get(uid)
        if not user or user.role != "admin":
            abort(403)
        return fn(*args, **kwargs)
    return wrapper

# ───── /users ───────────────────────────────────────
@admin_bp.route("/users", methods=["GET"])
@admin_required
def users():
    rows = User.query.order_by(User.id).all()
    return jsonify([{"id": u.id, "username": u.username, "role": u.role} for u in rows])

# ───── /results ─────────────────────────────────────
@admin_bp.route("/results", methods=["GET"])
@admin_required
def results():
    data = []
    for p in Poll.query.all():
        totals = {c.text: len(c.votes) for c in p.choices}
        data.append({"poll": p.title, "totals": totals})
    return jsonify(data)
