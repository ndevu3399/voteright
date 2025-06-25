# schemas.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models import Poll, Choice, User

class ChoiceSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Choice
        include_fk = True
        load_instance = True

class PollSchema(SQLAlchemyAutoSchema):
    choices = ChoiceSchema(many=True)

    class Meta:
        model = Poll
        include_relationships = True
        load_instance = True

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        fields = ("id", "username", "role")
