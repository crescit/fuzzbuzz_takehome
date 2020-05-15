# fuzzbuzz_takehome

Takehome for FuzzBuzz

# Docker Instructions

To build the docker image run:

docker build -t fuzzbuzz_takehome .


docker run -p 3000:8080 -d fuzzbuzz_takehome

Please note that the endpoint will only be exposed through the client. To hit the test endpoint /api/ping just call
localhost:3000/api/ping
