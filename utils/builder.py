import sys
import os

rev = 5;
output = '../build/Stats.js';
string = "// stats.js r" + str(rev) + " - http://github.com/mrdoob/stats.js\n";

# os.system("java -jar yuicompressor-2.4.2.jar ../src/Stats.js -o ../build/Stats.js --charset utf-8 -v");
os.system("java -jar compiler.jar --js ../src/Stats.js --js_output_file ../build/Stats.js");

src_file = open(output,'r');
string += src_file.read() + "\n";

dep_file = open(output,'w');
dep_file.write(string);
dep_file.close();
