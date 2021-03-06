docker run --rm \
    --name postgres \
    -e POSTGRES_USER=myuser \
    -e POSTGRES_PASSWORD=mypassword \
    -e POSTGRES_DB=user-profile \
    -p 5432:5432 \
    -v user-profile-vol:/var/lib/postgresql/data \
    postgres:13