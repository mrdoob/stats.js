import sys
import os

rev = 7;
output = '../build/Stats.js';
string = "// stats.js r" + str(rev) + " - http://github.com/mrdoob/stats.js\n";

os.system("java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ../src/Stats.js --js_output_file ../build/Stats.js");

src_file = open(output,'r');
string += src_file.read() + "\n";

dep_file = open(output,'w');
dep_file.write(string);
dep_file.close();
