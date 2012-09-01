import os

source = '../src/Stats.js'
output = '../build/stats.min.js'

os.system('java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + source + ' --js_output_file ' + output)

with open(output,'r') as f: text = f.read()
with open(output,'w') as f: f.write("// stats.js - http://github.com/mrdoob/stats.js\n" + text)
