# i know it's basic but credit where it's due
# this was inspired by jbr
# https://github.com/jbr/sugarcube/blob/master/compile.sh

shopt -s extglob # Enables extglob

# The first weird expression means all js files in the src directory except index
# Typically we would concatenate vendor files first, but this is a special case
cat src/!(index).js \
    vendor/*.js \
    src/index.js \
> dist/force-directed-graph.js && \

which jsdoc > /dev/null && \
jsdoc src/*.js -d docs && \

which uglifyjs > /dev/null && \
uglifyjs force-directed-graph.js \
         2> /dev/null \
         > dist/force-directed-graph.min.js