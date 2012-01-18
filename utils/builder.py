import os

rev = 9
source = '../src/Stats.js'
build = '../build/Stats.js'
header = '// stats.js r' + str( rev ) + ' - http://github.com/mrdoob/stats.js\n'

os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + source + ' --js_output_file ' + build )

file = open( build, 'r' )
contents = file.read();
file.close()

file = open( build, 'w' )
file.write( header + contents )
file.close()
