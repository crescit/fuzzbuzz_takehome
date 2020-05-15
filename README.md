# fuzzbuzz_takehome

Takehome for FuzzBuzz

# Docker Instructions

To build the docker image run:

docker build -t fuzzbuzz_takehome .


docker run -p 3000:8080 -d fuzzbuzz_takehome

Please note that the endpoint will only be exposed through the client. 

# To see the UX: 
http://localhost:3000

# To hit the endpoints: 
GET ​http://localhost:3000/api/:github_org/:github_repo/info​
POST ​http://localhost:3000/api/:github_org/:github_repo/test​
