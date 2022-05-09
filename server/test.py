# test.py: The main entrypoint for testing features of the SAL server
# 
# Authors: Jude Javillo and Ronin Sharma
# 6 May 2022

from tests.database import test_database

CYAN = "\u001b[36m"
NORMAL = "\u001b[0m"

print(CYAN + "Begin Testing SAL Server" + NORMAL)

test_database()

print(CYAN + "End Testing SAL Server" + NORMAL)
