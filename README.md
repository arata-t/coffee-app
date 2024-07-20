# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# coffee-app

## 注意

rails -s でサーバーを起動する。
サーバーを起動する前に、vueのcoffee-appディレクトリでbuildを実行して、publicは以下のファイルを最新にしておくこと。
DBはHerokuのClearDBを参照している。
`$heroku config | grep CLEARDB_DATABASE_URL`
で表示したCLEARDB_DATABASE_URLをメモにコピーし、TablePlusを開いてから、メモのリンクに飛ぶことでClearDBを確認できる
