#!/usr/bin/env python3
""" MODUL  """


def update_topics(mongo_collection, name, topics):
    """ Function """
    mongo_collection.update_many({"name": name}, {"$set": {"topics": topics}})
