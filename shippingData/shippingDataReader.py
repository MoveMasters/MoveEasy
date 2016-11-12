import json
import sys
import xlrd
from os.path import join, dirname, abspath


if len(sys.argv) < 2:
  fname= '/Users/stephen/Dropbox/File requests/DB Info/Erik Su - Basecamp Download (1)/Suddath United Surveys U00411 to U00420.xlsx'
  #fname = '/Users/stephen/Documents/test.xlsx'
else:
  fname = sys.argv[1]
print 'start'

xl_workbook = xlrd.open_workbook(fname)

print 'read'

name_col_num = 9
cft_col_num = 10

class Item:
  def __init__(self, name):
    self.name = name
    self.num = 0
    self.totalCtf = 0

  def addOne(self, Ctf):
    self.totalCtf += Ctf
    self.num += 1

  def getAverageCtf(self):
    return self.totalCtf / self.num

  def __str__(self):
    return "%s, Count: %d, Ctf: %f"%(self.name, self.num, self.getAverageCtf())

  def __repr__(self):
    return {"name": self.name, "count": self.num, "ctf": self.getAverageCtf()}

  def getShortInfo(self):
    return '%s\t%d\t%d'%(self.name, self.num, self.getAverageCtf())

  def __str__(self):
    name = self.name
    num = self.num
    ctf = self.getAverageCtf()
    return '{"name": "%(name)s", "count": %(num)d, "ctf": %(ctf)d'%vars()



itemDict = {}
itemList = []


for name in xl_workbook.sheet_names():
  xl_sheet = xl_workbook.sheet_by_name(name)
  for rowNum in range(xl_sheet.nrows):
    row = xl_sheet.row(rowNum);
    if rowNum == 0:
      headers = row
      continue
    if len(row) < cft_col_num:
      continue
    name = str(row[name_col_num].value)
    ctf_str = str(row[cft_col_num].value)
    try:
      ctf = float(ctf_str)
    except:
      print "Had issue evaluating cell reading %(ctf_str)s on row %(rowNum)d"%vars()
      continue
    if name not in itemDict:
      itemDict[name] = Item(name)
      itemList.append(itemDict[name])
    itemDict[name].addOne(ctf)

itemList.sort(key = lambda x: x.num, reverse=True)
itemStrings = map(lambda x: str(x), itemList)

fileOut = open('shippingData.json', 'wb')
allItems = map(lambda x: x.__repr__(), itemList)
fileOut.write(json.dumps(allItems));
fileOut.close()

#names
itemNames = map(lambda x: x.getShortInfo(), itemList)

fileOut = open('shippingData.csv', 'wb')
fileOut.write('Name\tNumber\tCtf\n')
fileOut.write('\n'.join(itemNames))
fileOut.close()



