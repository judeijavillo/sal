# database.py: functions for accessing the database
# 
# Authors: Jude Javillo and Ronin Sharma
# Version: 5 May 2022

from pymongo import MongoClient
from bson.objectid import ObjectId
from constants import DB_HOST, DB_PORT

# CONFIGURATION ****************************************************************

client = MongoClient(host = DB_HOST, port = DB_PORT)

# FUNCTIONS ********************************************************************

def get(database, school, filter = {}, one = False, objectId = ""):
  """
  Returns a list of objects in the corresponding collection denoted by the
  database and school
  """
  collection = client[database][school]
  try:
    if one:
      result = collection.find_one({ "_id": ObjectId(objectId) })
      result["_id"] = str(result["_id"])
    else:
      cursor = collection.find(filter)
      result = []
      for element in cursor:
        element["_id"] = str(element["_id"])
        result.append(element)
    return result
  except:
    return None


def post(database, school, body, one = True):
  """
  Inserts one or more objects into the given school in the given database. If 
  one is True, inserts a single object with the given JSON-like body. Otherwise,
  inserts multiple objects denoted by body, which in this case is expected to be
  an iterable of JSON-like objects. Returns the result of the MongoDB Insert.
  """
  try:
    collection = client[database][school]
    if one:
      result = collection.insert_one(body)
    else:
      result = collection.insert_many(body)
    return result
  except:
    return None


def patch(database, school, body, filter = {}, one = False, objectId = ""):
  """
  Updates one or more objects in the given school and the given database with 
  the update body fields. If one is True, updates a single object with a 
  matching objectId. Otherwise, updates multiple objects matching the given 
  filter. Returns the result of the MongoDB Update.
  """
  try:
    collection = client[database][school]
    if one:
      result = collection.update_one({"_id": ObjectId(objectId)}, {"$set": body})
    else:
      result = collection.update_many(filter, {"$set": body})
    return result
  except:
    return None


def delete(database, school, filter = {}, one = False, objectId = ""):
  """
  Deletes one or more objects in the given school and the given database. If one
  is True, deletes a single object with a matching objectId. Otherwise, deletes
  multiple objects matching the given filter. Returns the result of a MongoDB
  Delete.
  """
  try:
    collection = client[database][school]
    if one:
      result = collection.delete_one({"_id": ObjectId(objectId)})
    else:
      result = collection.delete_many(filter)
    return result
  except:
    return False
