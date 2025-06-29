"""Merge multiple heads

Revision ID: b6dbe82d0c75
Revises: 7357aa261d40, eb790541d5c9
Create Date: 2025-06-29 19:24:58.819767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6dbe82d0c75'
down_revision = ('7357aa261d40', 'eb790541d5c9')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
