#! /bin/sh
#
# build.sh
# Copyright (C) 2023 ray <ray@pH-ASUS>
#
# Distributed under terms of the MIT license.
#

set -xe
wasm-pack build --target web
tsc --lib es6,dom --target es6 index.ts
