
// require を使ってモジュールをインポート
// fs モジュールはファイルの入出力を行うモジュール
let fs = require('fs');

let d = new Date();
let f = formatDate(d);

// ファイルにフォーマット済み文字列を出力する
// 第一引数に出力するパス、第二引数に書き込む内容、
// 第三引数に処理終了後に呼ばれるコールバック関数を渡す
//[./]カレントパス
// カレントなパスにout.txtを出力
fs.writeFile('./out.txt', f, (error) => {
    if(error){
        // なんらかのエラーが起きている場合は例外をスロー
        throw error;
    }
    // エラーが起こらなかった場合は成功した旨をメッセージで出力
    console.log('output success!');
});

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

