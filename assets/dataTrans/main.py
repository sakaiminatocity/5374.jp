import openpyxl
import json
import collections
import datetime

filename = 'master.xlsx'

print(f'{datetime.timedelta()} : ExcelデータのJson変換開始...')
print('--------------------------------------------------')

workbook = openpyxl.load_workbook(filename, read_only = True, data_only = True)
print(f'{datetime.timedelta()} : {filename}の情報を読み込み...')


print('--------------------------------------------------')
print(f'{datetime.timedelta()} : シート数取得開始...')
sheet_count = len(workbook.sheetnames)
print(f'{datetime.timedelta()} : シート数 = {sheet_count}')

for sheet_name in workbook.get_sheet_names():
  json_collection = []
  json_labels = []
  json_name = sheet_name + '.json'
  object_cache = collections.OrderedDict()
  data_count = 0
  column_count = 0
  worksheet = workbook[sheet_name]
  print('--------------------------------------------------')
  print(f'{datetime.timedelta()} : {sheet_name} シートの情報を読み込み開始...')
  for worksheet_row in worksheet.rows:
    if data_count > 0: # 2件目以降の処理
      column_count = 0
      object_cache = collections.OrderedDict()
    for worksheet_cell in worksheet_row:
      cell_value = worksheet_cell.value
      if type(cell_value) == float:
        cell_value = int(cell_value)
      if data_count < 1: # 最初の処理でラベルを取得
        if not (cell_value is None):
          json_labels.append(cell_value)
      else:
        if not (cell_value is None):
          object_cache[json_labels[column_count]] = cell_value
        else:
          object_cache[json_labels[column_count]] = ''
        column_count += 1
    if data_count > 0: # 2件目以降の処理
      if len(object_cache) > 0:
        json_collection.append(object_cache)
      else:
        data_count -= 1
    data_count += 1
  print(f'{datetime.timedelta()} : {sheet_name} シートの情報を読み込み完了...')

  print(f'{datetime.timedelta()} : データ件数 = {data_count - 1} ...')
  print(f'{datetime.timedelta()} : {json_name}のファイルを作成開始...')
  with open(json_name, 'w') as f:
    json.dump(json_collection, f, ensure_ascii=False, indent=2)
  print(f'{datetime.timedelta()} : {json_name}のファイルを作成完了...')

print('--------------------------------------------------')
print(f'{datetime.timedelta()} : ExcelデータのJson変換完了...')
