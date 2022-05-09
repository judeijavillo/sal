# database.py: tests for database connection
# 
# Authors: Jude Javillo and Ronin Sharma
# Version: 6 May 2022

from ast import Assert
from utils.database import *

TEST_DB = "Tests"
TEST_COLLECTION = "Cornell_University"

def test_database():
  """
  Tests basic features of the database (GET, POST, PATCH, DELETE)
  """
  test_get()
  test_post()
  test_patch()
  test_delete()


def test_get():
  """
  Tests a simple GET method
  """
  print("Testing GET method")
  get(TEST_DB, TEST_COLLECTION)


def test_post():
  """
  Tests a simple POST method
  """
  print("Testing POST method")
  post(TEST_DB, TEST_COLLECTION, { "message": "It works!" })


def test_patch():
  """
  Tests a simple PATCH method
  """
  print("Testing PATCH method")
  patch(TEST_DB, TEST_COLLECTION, { "update": "It still works!" })


def test_delete():
  """
  Tests a simple DELETE method
  """
  print("Testing DELETE method")
  delete(TEST_DB, TEST_COLLECTION, { "message": "It works!" } )
