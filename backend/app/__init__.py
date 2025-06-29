from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # ✅ Import CORS

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # ✅ Enable CORS for requests from frontend
    CORS(app, origins=["http://localhost:5173"])

    from app.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/")

    from app.routes import poll_bp
    app.register_blueprint(poll_bp, url_prefix="/polls")

    return app
