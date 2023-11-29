#!/usr/bin/env bash

for var in "${!REPLACE_@}"; do
    declare -n value=$var
    sed -i "s#$var#$value#g" /usr/share/nginx/html/assets/index-*.js
done
