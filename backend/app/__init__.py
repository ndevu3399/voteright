# backend/app/__init__.py

print(">>> Using INIT file:", __file__)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

   
   

    from app.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    from app.routes import poll_bp
    app.register_blueprint(poll_bp, url_prefix="/api/polls")

    @app.route("/")
    def index():
        return {"message": "API is running"}

    with app.app_context():
        try:
            db.engine.connect()
            print("✅ Database connection successful!")
        except Exception as e:
            print("❌ Database connection failed:", str(e))
    

    return app
