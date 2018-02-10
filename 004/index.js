
let fs = require('fs');
let path = require('path'); // パス操作を行うモジュール

let d = new Date();
let f = formatDate(d);

// 実行中のスクリプトからの相対パスを取得
// __dirname は実行中のスクリプトの絶対パス
// path.join でパスを正しく連結できる

let p = path.join(__dirname, 'out.txt');

fs.writeFile(p, f, (error) => {
    if(error){
        throw error;
    }
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

