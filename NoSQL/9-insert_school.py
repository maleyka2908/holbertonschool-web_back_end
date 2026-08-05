#!/usr/bin/env python3
""" Modul """


def insert_school(mongo_collection, **kwargs):
    """ Function """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
