export PYTHONDONTWRITEBYTECODE=1

setup:
	pip install -r requirements.txt
	cd website && npm install
	mkdir database

test-server:
	echo "Testing SAL Server"
	cd server && python3.9 -m test

run-server:
	echo "Starting SAL Server"
	cd server && python3.9 -m app

run-website:
	echo "Starting SAL Website"
	cd website && npm run start

run-database:
	echo "Starting SAL Database"
	cd database && mongod --dbpath . --port 7000

run-aws:
	echo "Connecting to SAL Dev Server at 3.138.173.189 and linking to port 7000"
	cd aws && ssh -i "SimplifyAfterLecture.pem" -L 7000:localhost:7000 ec2-user@ec2-3-138-173-189.us-east-2.compute.amazonaws.com
