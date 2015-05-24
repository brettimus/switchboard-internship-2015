# i know it's basic but credit where it's due
# i stole this from jbr
# https://github.com/jbr/sugarcube/blob/master/compile.sh

# typically we would concatenate vendor js first... but this is a special case! :D
cat src/vector.js \
    src/graph-node.js \
    vendor/draw_graph.js \
    src/index.js \
> dist/force-directed-graph.js && \

which uglifyjs > /dev/null && \
uglifyjs force-directed-graph.js \
         2> /dev/null \
         > dist/force-directed-graph.min.js