from db import *

def drop_tables():
    db.drop_all()


def recreate():
    drop_tables()
    db.create_all()


def add_dummy_data():
    jamil = User(username="Jamil", email="jamil@gmail.com")
    akeem = User(username="Akeem", email="akeem@gmail.com")
    kyle = User(username="Kyle", email="kyle@gmail.com")
    robin = User(username="My Love the best", email="robin@gmail.com")

    db.session.add_all([jamil, akeem, kyle, robin])
    db.session.commit()

    allot1 = Allotment(name="Sleep", hours=57.8, user=jamil)
    allot2 = Allotment(name="Work", hours=47.2, user=jamil)
    allot3 = Allotment(name="Sleep", hours=53.57, user=akeem)
    allot4 = Allotment(name="DJing", hours=16.5, user=akeem)
    allot5 = Allotment(name="Sleep", hours=56.8, user=kyle)
    allot6 = Allotment(name="Hooping", hours=4.3, user=kyle)
    allot7 = Allotment(name="NBA games", hours=4.82, user=kyle)
    allot8 = Allotment(name="Saving the world", hours=14.6, user=robin)

    db.session.add_all([allot1, allot2, allot3, allot4, allot5, allot6, allot7, allot8])
    db.session.commit()
