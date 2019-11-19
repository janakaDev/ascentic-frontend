#!/bin/bash

# Dependencies
npm install --unsafe-perm
npm audit fix

# Replace variables
#sed -i "s/{commithash}/${CI_COMMIT_SHA}/g" src/environments/environment.prod.ts
#sed -i "s/{commithash}/${CI_COMMIT_SHA}/g" src/environments/environment.stage.ts