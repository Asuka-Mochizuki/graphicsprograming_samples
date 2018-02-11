
const PORT       = 8888; // ポート番号
const FIELD_SIZE = 100;  // フィールドのマス目の量（幅・高さ）
const LOOP_COUNT = 100;  // ループする回数（多いほど高負荷・正確）
const OFFSET_X   = -0.5; // 横位置をオフセットする量
const OFFSET_Y   = 0.0;  // 縦位置をオフセットする量

let fs = require('fs');
let path = require('path');
let http = require('http');
let server = http.createServer();

server.on('request', (request, response) => {
    // 開くファイルのパスを生成
    let pathString = path.join(__dirname, 'index.html');

    // パスの指定に従ってファイルを開く
    let html = fs.readFile(pathString, 'utf-8', (error, data) => {
        if(error){
            // エラーが起こった場合はレスポンスヘッダに 404 ステータスを
            // 設定し、プレーンなテキストとしてファイルが存在しないことを示す
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404: not Found');
            response.end();
            return;
        }
        // 無事にファイルを開くことができたので処理を行い結果を連結
        let source = data + mandelbrot();

        // ファイルの中身の HTML に結果を書き足してからリクエスト元に返す
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(source);
        response.end();
    });
});

server.listen(PORT);
console.log('server running!');
console.log('http://localhost:' + PORT);

// マンデルブロ集合を文字列として生成して返す関数
function mandelbrot(){
    let table = [];
    for(let y = 0; y < FIELD_SIZE; ++y){
        table[y] = [];
        for(let x = 0; x < FIELD_SIZE; ++x){
            let centerX = (x / FIELD_SIZE - 0.5) * 2.0;
            let centerY = (y / FIELD_SIZE - 0.5) * 2.0;
            table[y][x] = calcSet(centerX, centerY);
        }
    }
    let htmlSource = '<pre><code>';
    table.map((row) => {
        row.map((col) => {
            // マンデルブロ集合は計算をどの程度繰り返したのか、ということを
            // 可視化することで描き出されるので、ループ回数で割って正規化し
            // その値の大小によって出力する文字を変える
            let count = col / LOOP_COUNT;
            if(count < 0.1){
                htmlSource += '<span class="blue"> </span>';
            }else if(count < 0.3){
                htmlSource += '<span class="cyan"> </span>';
            }else if(count < 0.5){
                htmlSource += '<span class="lightgreen"> </span>';
            }else if(count < 0.7){
                htmlSource += '<span class="yellow"> </span>';
            }else if(count < 0.9){
                htmlSource += '<span class="orange"> </span>';
            }else{
                htmlSource += '<span class="red"> </span>';
            }
        });
        htmlSource += '\n';
    });
    htmlSource += '</code></pre>';
    return htmlSource;
}
// 漸化式を計算しカウント数を返す
function calcSet(centerX, centerY){
    let count = 0;
    let outX = 0;
    let outY = 0;
    for(let i = 0; i < LOOP_COUNT; ++i){
        let x = outX;
        let y = outY;
        outX = x * x - y * y + centerX + OFFSET_X;
        outY = 2.0 * x * y + centerY + OFFSET_Y;
        let len = Math.sqrt(outX * outX + outY * outY);
        if(len > 2.0){
            return count;
        }
        ++count;
    }
    return LOOP_COUNT;
}

