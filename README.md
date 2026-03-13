# output-js-application(JavaScriptのアウトプット(応用編))

- 学習内容：JavaScript
- 作成時期：2026年3月

# weather-data(天気データ取得アプリ)

- 練習テーマ：async・await / fetch / JSON処理 / try・catch

・当日の天気、最高気温、最低気温を取得する。  
・セレクトボックスから都市を選択し、「天気取得」ボタンを押すと、選択した都市の情報が表示される。

・状態管理  
Loading：データを読み込み中です…  
Error：エラーが発生しました。  
と表示される。

・Open-MeteoのAPIを使用。  
都市を増やす場合は、都市名と都市の経度・緯度を配列cityに追加すること。  
経度・緯度は、Open-Meteoより取得する。  
URL：https://open-meteo.com
