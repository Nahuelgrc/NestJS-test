#!/bin/bash

SCRIPTS_DIR=`dirname "$0"`
ECHO $SCRIPTS_DIR
cat "$SCRIPTS_DIR/../sql/schemas.sql" "$SCRIPTS_DIR/../sql/seeds.sql" \
    | psql -U myuser -d user-profile -p 5432 -h localhost -1 -f -