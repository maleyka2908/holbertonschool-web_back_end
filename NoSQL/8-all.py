#!/usr/bin/env python3
"""lists all documents in collection """


def list_all(mongo_collection):
    """Function """
    return list(mongo_collection.find())
