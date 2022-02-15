#!/bin/bash
set -x

IMAGE_NAME="todoapp-frontend"
IMAGE_TAG="1.0.4"
GCP_PROJECT_ID="phu-le-it"
GCP_REGION="asia-northeast1"
GCP_IMAGE_REPOSITORY="todoapp-repository"

docker image build -t ${IMAGE_NAME}:dev .
docker image tag ${IMAGE_NAME}:dev ${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/${GCP_IMAGE_REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}
docker image push ${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/${GCP_IMAGE_REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}
