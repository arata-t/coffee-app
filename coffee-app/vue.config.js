const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: '../public', //ビルドファイルがRailsアプリケーションのpublicディレクトリに出力されるようになります。
  assetsDir: '', //assetsDirは、ビルド時に生成される静的ファイルの出力先ディレクトリを指定するオプションです。デフォルトでは、"assets"ディレクトリに静的ファイルが出力されますが、assetsDirを空の文字列("")に設定することで、出力先をルートディレクトリに変更することができます。例えば、assetsDir: ''とすることで、ビルドされた静的ファイルがルートディレクトリに直接出力されます。
  publicPath: '' //publicPathは、生成された静的ファイルが配信される際のパスを指定するオプションです。デフォルトでは、"/"が設定されていますが、publicPathを空の文字列("")に設定することで、相対パスで静的ファイルを参照するようになります。例えば、publicPath: ''とすることで、ビルドされた静的ファイルを相対パスで参照することができます。
})
