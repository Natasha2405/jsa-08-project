#!/bin/bash

# BUILD FORONTEND APP
# cd public
# npm install
# npm run build
# cd -

# START SERVICES
node services/auth/index.js &
node services/storage/index.js &
node services/users/index.js &

# START PROXY
node services/proxy/index.js &

