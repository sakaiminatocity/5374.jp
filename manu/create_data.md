# データについて

## データのテーブルと各フィールドについて

- language (言語)
  - id (言語ID)
    - 整数 (重複は防ぐこと)
  - languageName (言語名)
    - 文字列

- area (エリア)
  - id (エリアID)
    - 整数 (重複は防ぐこと)
  - sort (表示順)
    - 整数
  - areaType (エリアタイプ)
    - 文字列
      - `-`
        - 単一エリア
      - `A`
        - A/B分類の小分類エリアTypeA
      - `B`
        - A/B分類の小分類エリアTypeB
  - areaDivision (エリア区分)
    - 整数
      - `0`
        - 単一エリア
      - `1`
        - A/B分類の大分類エリア
      - `2`
        - A/B分類の小分類エリア
  - centerId (担当センターID)
    - 整数
      - 該当するセンターテーブルのIDを適用
  - routineId (ローテーションID)
    - 整数
      - 該当するローテーションのIDを適用

- areaName (エリア各言語切替用データ)
  - id (エリア各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - areaId (エリアID)
    - 整数
      - 該当するエリアテーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - areaName (エリア名)
    - 文字列

- center (センター)
  - id (センターID)
    - 整数 (重複は防ぐこと)
  - phoneNum (電話番号)
    - 文字列
  - image (センター画像)
    - 文字列
      - `/assets/images`に格納されているセンターの画像ファイル名(拡張子含む)

- centerName (センター各言語切替用データ)
  - id (エリア各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - centerId (センターID)
    - 整数
      - 該当するセンターテーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - centerName (センター名)
    - 文字列
  - address (センター住所)
    - 文字列

- classification (ゴミ区分)
  - id (ゴミ区分ID)
    - 整数 (重複は防ぐこと)

- classificationName (ゴミ区分各言語切替用データ)
  - id (ゴミ区分各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - classificationId (ゴミ区分ID)
    - 整数
      - 該当するゴミ区分テーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - classificationName (ゴミ区分名)
    - 文字列

- garbage (ゴミデータ)
  - id (ゴミデータID)
    - 整数 (重複は防ぐこと)
  - classificationId (ゴミ区分ID)
    - 整数
      - 該当するゴミ区分テーブルのIDを適用
  - routineClassificationId (ローテーション区分ID)
    - 整数
      - 該当するローテーション区分テーブルのIDを適用

- garbageName (ゴミデータ各言語切替用データ)
  - id (ゴミデータ各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - garbageId (ゴミデータID)
    - 整数
      - 該当するゴミデータテーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - garbageName (ゴミデータ名)
    - 文字列
  - searchWord (検索用文字列)
    - 文字列
  - notice (備考)
    - 文字列

- label (ラベル)
  - id (ラベルID)
    - 整数 (重複は防ぐこと)

- labelString (ラベル各言語切替用データ)
  - id (ラベル各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - labelId (ラベルID)
    - 整数
      - 該当するラベルテーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - label (ラベル名)
    - 文字列

- notification (お知らせ)
  - id (お知らせID)
    - 整数 (重複は防ぐこと)
  - date (掲載日)
    - 整数 (8桁)
      - YYYYMMDDのフォーマットに従うこと
      - 先頭から年4桁月2桁日2桁
  - beginDate (掲載開始日)
    - 整数 (8桁)
      - YYYYMMDDのフォーマットに従うこと
      - 先頭から年4桁月2桁日2桁
  - endDate (掲載終了日)
    - 整数 (8桁)
      - YYYYMMDDのフォーマットに従うこと
      - 先頭から年4桁月2桁日2桁
  - cautionFlag (緊急情報フラグ)
    - 整数
      - `0`
        - 通常のお知らせ
      - `1`
        - 緊急のお知らせ

- notificationString (お知らせ各言語切替用データ)
  - id (お知らせ各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - notificationId (お知らせID)
    - 整数
      - 該当するお知らせテーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - title (見出し)
    - 文字列
  - notification (内容)
    - 文字列

- routine (ローテーション)
  - id (ローテーションID)
    - 整数 (重複は防ぐこと)

- routineDetail (ローテーション詳細)
  - id (ローテーション詳細ID)
    - 整数 (重複は防ぐこと)
  - routineId (ローテーションID)
    - 整数
      - 該当するローテーションテーブルのIDを適用
  - classificationId (ゴミ区分ID)
    - 整数
      - 該当するゴミ区分テーブルのIDを適用
  - year (年度)
    - 整数
      - YYYY(年4桁)のフォーマットで入力すること
  - month9～month8 (各月 / 9月開始)
    - 整数
      - `0`
        - 対象の月に回収のある週が無いことを示す
      - `1`
        - 対象の月に回収のある週があることを示す
  - week1～week６(各週)
    - 整数
      - `0`
        - 対象の週に回収のある曜日が無いことを示す
      - `1`
        - 対象の週に回収のある曜日があることを示す
      - `2`
        - 対象の週の回収が取り消しになったことを示す
        - イレギュラーフラグが`1`の場合のみ有効
  - daySun～daySat (各曜日)
    - 整数
      - `0`
        - 回収がこの曜日に無いことを示す
      - `1`
        - 回収がこの曜日にあることを示す
      - `2`
        - 回収が取り消しになったことを示す
        - イレギュラーフラグが`1`の場合のみ有効
  - irregularFlag (イレギュラーフラグ)
    - 整数
      - `0`
        - 無効
      - `1`
        - 有効
    - 特定の回収を取り消し、または追加・移動したい場合は使用する 

- routineClassification （ローテーション区分）
  - id (ローテーション区分ID)
    - 整数 (重複は防ぐこと)

- routineClassificationName (ローテーション区分各言語切替用データ)
  - id (ローテーション区分各言語切替用データID)
    - 整数 (重複は防ぐこと)
  - routineClassificationId (ローテーション区分ID)
    - 整数
      - 該当するローテーション区分テーブルのIDを適用
  - languageId (言語ID)
    - 整数
      - 該当する言語テーブルのIDを適用
  - routineClassificationName (ローテーション区分名)
    - 文字列

## データの作成について

データの作成には、`/assets/dataTrans`内のファイルを使ってください。
- master.xlsx
- main.py

`main.py`を実行すると同階層にある`master.xlsx`を読み込んで各種Jsonファイルを出力します。  
あとは出力されたJsonファイルを`/assets/data`に移動して上書きをしてください。

