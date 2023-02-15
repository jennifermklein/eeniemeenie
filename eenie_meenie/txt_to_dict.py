from pathlib import Path
import os
import json

nameDict = {}

# get all files in names data folder
data_folder = Path("eenie_meenie/names/")
files = os.listdir(data_folder)

# loop over all years
for file in files:
    f = data_folder / file
    year = f.name[-8:-4]
    nameDict[year] = {"M": [], "F": [], "N": []}

    with open(f) as data:
        line = data.readline()
        while line:
            line_data = line.split(",")
            name = line_data[0]
            gender = line_data[1]
            nameDict[year][gender].append(name)
            line = data.readline()

# print(nameDict)
# with open("eenie_meenie/namesDict.py", "w") as data:
#     data.write("nameDict = " + str(nameDict))

# with open('eenie_meenie/namesDict.py', 'w') as convert_file:
#      convert_file.write(json.dumps(nameDict))

with open('eenie_meenie/namesDict.py', 'w') as f: 
    json.dump(nameDict, f) 