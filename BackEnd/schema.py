import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from db import db, User as UserModel, Allotment as AllotmentModel


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node,)


class Allotment(SQLAlchemyObjectType):
    class Meta:
        model = AllotmentModel
        interfaces = (relay.Node,)


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_users = SQLAlchemyConnectionField(User.connection)

    # Disable sorting over this field
    all_allotments = SQLAlchemyConnectionField(Allotment.connection)

    # TODO: Find out what this lambda does
    users = graphene.List(
        lambda: User, username=graphene.String(), email=graphene.String()
    )

    def resolve_users(self, info, **args):
        username = args.get("username")

        query = User.get_query(info)

        users = query.filter(UserModel.username == username).first()

        # An alternative method is to use "filter_by" and keyword arguments
        users = query.filter_by(username=username).first()

        # Since we say we're returning a list, we must surround our results in brackets
        return [users]


schema = graphene.Schema(query=Query)