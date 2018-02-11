
// ポートを定数で指定しておく
// constで宣言したものは再代入はできない
const PORT = 8888;

// http モジュールでサーバを起動できる
let http = require('http');

// http.createServer でサーバのインスタンスを生成
let server = http.createServer();

// サーバにリクエストがあった場合の処理を on を使って登録する
// 第一引数がイベントの種類で、ここではリクエストがあった場合を
// 想定しているため 'request' を指定している
// 第二引数がイベントが起こったときのコールバック関数
server.on('request', (request, response) => {
    // レスポンスヘッダ（レスポンスの情報）を設定する
    // ヘッダには様々な情報を含ませることができるが、ここでは
    // レスポンスはプレーンテキストであることを設定している
    //200はリクエストが成功したことを表す
    // content typeはレスポンスのタイプ
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // end にフォーマットした日付文字列を渡して終了
    response.end(formatDate(new Date()));
});

// 上記の server.on は、あくまでもリクエストがあったときの処理なので
// 今すぐ実行されるかどうかは未知数なので、順序的には後になるが
// ここでサーバのリッスン（耳を傾けて待機するイメージ）を開始する
server.listen(PORT);

// サーバが起動したことをメッセージとして出力
console.log('server running!');
console.log('http://localhost:' + PORT);

/**
 * Date 型のデータをフォーマットして返す
 * @param {Date} date - フォーマットする Date 型のデータ
 * @param {string} [delimiter='/'] - 年月日の区切り文字
 */
function formatDate(date, delimiter = '/'){
    let y = date.getFullYear();  // 四桁の年
    let m = date.getMonth() + 1; // 月（０始まり）
    let d = date.getDate();      // 日
    let h = date.getHours();     // 時
    let i = date.getMinutes();   // 分
    let s = date.getSeconds();   // 秒
    return y + delimiter + m + delimiter + d + ' ' + h + ':' + i + ':' + s;
}

