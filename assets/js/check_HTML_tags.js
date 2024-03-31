function checkHTMLTags(html) {
    var stack = [];
    var mismatchedTag = null;

    var tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/g;
    var match;

    while ((match = tagRegex.exec(html)) !== null) {
        var tag = match[1];
        var index = match.index;

        // Loại bỏ các thẻ không cần kiểm tra
        if (['img', 'input', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tag)) continue;

        if (!match[0].startsWith('</')) {
            stack.push({ tag: tag, index: index });
        } else {
            if (stack.length === 0) {
                mismatchedTag = { tag: tag, index: index, type: 'close' };
                break; // Thoát khỏi vòng lặp ngay khi tìm thấy thẻ không phù hợp
            } else {
                var openTag = stack.pop();
                if (openTag.tag !== tag) {
                    mismatchedTag = { tag: openTag.tag, index: openTag.index, type: 'open' };
                    break; // Thoát khỏi vòng lặp ngay khi tìm thấy thẻ không phù hợp
                }
            }
        }
    }

    if (mismatchedTag !== null) {
        var errorMessage = "Thẻ HTML không được mở hoặc đóng đúng cách:\n";
        var line = convertIndexToLineNumber(html, mismatchedTag.index);
        var tagType = mismatchedTag.type === 'open' ? "Thẻ mở" : "Thẻ đóng";
        errorMessage += mismatchedTag.tag + " (line " + line + "): " + tagType + " dư\n";
        return errorMessage;
    }

    return "Tất cả các thẻ HTML đã được mở và đóng đúng cách.";
}

function convertIndexToLineNumber(html, index) {
    var lines = html.split('\n');
    var lineNumber = 0;
    var linePosition = 0;

    for (var i = 0; i < lines.length; i++) {
        lineNumber++;
        linePosition += lines[i].length + 1; // Cộng thêm 1 để tính cả ký tự xuống dòng
        if (linePosition > index) {
            break;
        }
    }

    return lineNumber;
}

// Sử dụng hàm để kiểm tra
var html = 
`
`
;
var result = checkHTMLTags(html);
console.log(result);