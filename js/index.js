// function([string1, string2],target id,[color1,color2])

class ChangeTag {
    constructor(getIdName, addClassName) {
        this.getIdName = getIdName;
        this.addClassName = addClassName;
    }

    addClassToCSS(getIdName, addClassName) {
        let target = document.getElementById(getIdName);
        target.classList.add(addClassName);
    }

    addTextToHTML(addText) {
        let target = document.getElementById(this.getIdName);
        target.innerHTML = addText;
        console.log(target);
        this.addClassToCSS(this.getIdName, this.addClassName);
    }
}

// @todo 非同期処理なんとかする
const promise = new Promise(function (resolve, reject) {
    typingText(["Craft++", "create and craft team"], "title", [
        "rgb(216, 237, 255)",
    ]);
});

let fadeText = new ChangeTag("title", "fadeUp");
console.log(fadeText);
promise.then(function () {
    fadeText.addTextToHTML("Craft++");
});
//

function typingText(words, id, colors) {
    if (colors === undefined) colors = ["#fff"];
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let target = document.getElementById(id);

    // target.innerHTML = words[0].substring(0, letterCount);

    target.setAttribute("style", "color:" + colors[0]);

    setTimeout(() => {
        const timerId = setInterval(() => {
            if (letterCount === 0 && waiting === false) {
                //テキスト挿入開始時

                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount);

                setTimeout(() => {
                    let usedColor = colors.shift();
                    colors.push(usedColor);
                    let usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute("style", "color:" + colors[0]);

                    waiting = false;

                    if (usedWord === "Craft++") {
                        // create and craft teamの文字列はフォントサイズ変更
                        target.setAttribute("style", "font-size: 45px");
                    } else {
                        //停止
                        clearInterval(timerId);
                    }

                    letterCount += x;
                }, 1500);
            } else if (
                //テキスト挿入終了後

                letterCount === words[0].length + 1 &&
                waiting === false
            ) {
                waiting = true;
                setTimeout(() => {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 2000);
            } else if (waiting === false) {
                //テキストの挿入と消去

                target.innerHTML = words[0].substring(0, letterCount);
                letterCount += x;
            }
        }, 95);
    }, 500);
}
