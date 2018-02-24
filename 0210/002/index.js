
// Date インスタンスを生成
let d = new Date();

// フォーマット済みの文字列として出力
console.log(formatDate(d));

/**
 * Date 型のデータをフォーマットして返す
 * @param {Date} date - フォーマットする Date 型のデータ
 * @param {string} [delimiter='/'] - 年月日の区切り文字
 * @return {string} 整形済みの文字列
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