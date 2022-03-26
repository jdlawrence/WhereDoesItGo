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
    user = graphene.List(
        lambda: User, username=graphene.String(), email=graphene.String()
    )

    allotments_by_user = graphene.List(
        lambda: Allotment,
        username=graphene.String(),
    )

    def resolve_user(self, info, **kwargs):
        username = kwargs.get("username")

        query = User.get_query(info)

        user = query.filter_by(username=username).all()

        return user

    def resolve_allotments_by_user(self, info, **kwargs):
        username = kwargs.get("username")

        user = UserModel.query.filter_by(username=username).first()

        return user.allotments


class UserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(lambda: User)

    def mutate(self, info, **kwargs):
        username = kwargs.get("username")
        email = kwargs.get("email")
        user = UserModel(username=username, email=email)

        db.session.add(user)
        db.session.commit()

        return UserMutation(user=user)


class AllotmentMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        hours = graphene.Float(required=True)
        user_id = graphene.Int(required=True)

    allotment = graphene.Field(lambda: Allotment)

    def mutate(self, info, **kwargs):
        name = kwargs.get("name")
        hours = kwargs.get("hours")
        user_id = kwargs.get("hours")


class Mutation(graphene.ObjectType):
    mutate_user = UserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
