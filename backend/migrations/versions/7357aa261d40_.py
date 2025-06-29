"""empty message

Revision ID: 7357aa261d40
Revises: 
Create Date: 2025-06-25 20:49:27.389230
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision = '7357aa261d40'
down_revision = None
branch_labels = None
depends_on = None

def table_not_exists(table_name):
    conn = op.get_bind()
    result = conn.execute(text(f"SELECT to_regclass('{table_name}')"))
    return result.scalar() is None

def upgrade():
    if table_not_exists('poll'):
        op.create_table('poll',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('title', sa.String(length=255), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('id')
        )

    if table_not_exists('user'):
        op.create_table('user',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('username', sa.String(length=80), nullable=False),
            sa.Column('password_hash', sa.String(length=128), nullable=False),
            sa.Column('role', sa.String(length=20), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.UniqueConstraint('username')
        )

    if table_not_exists('choice'):
        op.create_table('choice',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('text', sa.String(length=255), nullable=False),
            sa.Column('poll_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['poll_id'], ['poll.id']),
            sa.PrimaryKeyConstraint('id')
        )

    if table_not_exists('vote'):
        op.create_table('vote',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=False),
            sa.Column('choice_id', sa.Integer(), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['choice_id'], ['choice.id']),
            sa.ForeignKeyConstraint(['user_id'], ['user.id']),
            sa.PrimaryKeyConstraint('id')
        )

def downgrade():
    op.drop_table('vote')
    op.drop_table('choice')
    op.drop_table('user')
    op.drop_table('poll')
