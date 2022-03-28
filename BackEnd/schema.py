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
    user = graphene.Field(
        lambda: User, username=graphene.String(), email=graphene.String()
    )

    allotments_by_user = graphene.List(
        lambda: Allotment,
        username=graphene.String(),
    )

    def resolve_user(self, info, **kwargs):
        username = kwargs.get("username")

        query = User.get_query(info)

        user = query.filter_by(username=username).first()

        return user

    def resolve_allotments_by_user(self, info, **kwargs):
        username = kwargs.get("username")

        user = UserModel.query.filter_by(username=username).first()

        return user.allotments


class AddUserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    email = graphene.String(required=True)

class AddUser(graphene.Mutation):
    class Arguments:
        add_user_input = AddUserInput(required=True)

    user = graphene.Field(lambda: User)

    def mutate(self, info, add_user_input):
        username = add_user_input.get("username")
        email = add_user_input.get("email")
        user = UserModel(username=username, email=email)

        db.session.add(user)
        db.session.commit()

        return AddUser(user=user)


class AddAllotmentInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    hours = graphene.Float(required=True)
    username = graphene.String(required=True)


class AddAllotmentPayload(graphene.ObjectType):
    user = graphene.Field(lambda: User)
    allotment = graphene.Field(lambda: Allotment)


class AddAllotment(graphene.Mutation):
    class Arguments:
        add_allotment_input = AddAllotmentInput(required=True)

    payload = graphene.Field(AddAllotmentPayload)

    def mutate(self, info, add_allotment_input):
        name = add_allotment_input.get("name")
        hours = add_allotment_input.get("hours")
        username = add_allotment_input.get("username")

        user = UserModel.query.filter_by(username=username).first()
        allotment = AllotmentModel(name=name, hours=hours)

        payload = AddAllotmentPayload(user=user, allotment=allotment)

        user.allotments.append(allotment)
        db.session.commit()

        return AddAllotment(payload=payload)


class Mutation(graphene.ObjectType):
    add_user = AddUser.Field()
    add_allotment = AddAllotment.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
