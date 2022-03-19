import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from db import db, User as UserModel, Allotment as AllotmentModel

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class Allotment(SQLAlchemyObjectType):
    class Meta:
        model = AllotmentModel
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_users = SQLAlchemyConnectionField(User.connection)
    # Disable sorting over this field
    all_allotments = SQLAlchemyConnectionField(Allotment.connection)

schema = graphene.Schema(query=Query)

