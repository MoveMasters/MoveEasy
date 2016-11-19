import json
import sys
import xlrd
import re
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


def fixName(text):
  # text = text.replace('/', ' ')
  # text = text.replace('\\', ' ')
  # text = text.replace('"', ' ')
  # text = text.replace("'", ' ')
  return text

class Item:
  def __init__(self, name):
    self.name = name
    self.num = 0
    self.totalCft = 0

  def addOne(self, Cft):
    self.totalCft += Cft
    self.num += 1

  def getAverageCft(self):
    return self.totalCft / self.num

  def __str__(self):
    return "%s, Cft: %f"%(self.name, self.getAverageCft())

  def __repr__(self):
    return {"name": self.name, "cft": self.getAverageCft()}

  def getShortInfo(self):
    return '%s\t%d'%(self.name, self.getAverageCft())

  def __str__(self):
    name = self.name
    num = self.num
    cft = self.getAverageCft()
    return '{"name": "%(name)s", "cft": %(cft)d'%vars()


#check which items to store
itemList = open('shippingList.txt', 'rb').read().split('\n')
itemSet = set(itemList)

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
    name = fixName(name)

    if len(name) > 30:
      print 'name %(name)s too long!'%vars()
      continue
    cft_str = str(row[cft_col_num].value)
    try:
      cft = float(cft_str)
    except:
      print "Had issue evaluating cell reading %(cft_str)s on row %(rowNum)d"%vars()
      continue
    if name not in itemDict:
      itemDict[name] = Item(name)
      itemList.append(itemDict[name])
    itemDict[name].addOne(cft)

itemList.sort(key = lambda x: x.num, reverse=True)
itemStrings = map(lambda x: str(x), itemList)

#only certain items
fileOut = open('shippingData.json', 'wb')
matchingItems = filter(lambda x: x.name in itemSet, itemList)
matchingItems = map(lambda x: x.__repr__(), matchingItems)
fileOut.write(json.dumps(matchingItems));
fileOut.close()

#names
itemNames = map(lambda x: x.getShortInfo(), itemList)

fileOut = open('shippingData.csv', 'wb')
fileOut.write('Name\tCft\n')
fileOut.write('\n'.join(itemNames))
fileOut.close()



