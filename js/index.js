class ChangeTag {
    constructor(getIdName, addClassName) {
        this.getIdName = getIdName;
        this.addClassName = addClassName;
    }

    //できればプライベートにしたい
    addClassToCSS(getIdName, addClassName) {
        let target = document.getElementById(getIdName);
        target.classList.add(addClassName);
    }

    addTextToHTML(addText) {
        let target = document.getElementById(this.getIdName);
        target.innerHTML = addText;
        this.addClassToCSS(this.getIdName, this.addClassName);
    }
}

// function([string1, string2],target id,[color1,color2], resolve or reject)
function typingText(words, id, colors, resolve) {
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
                        resolve();
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

// タイトルが書きこまれていく
const titleAnimation = new Promise(function (resolve) {
    typingText(
        ["Craft++", "create and craft team"],
        "title",
        ["rgb(216, 237, 255)"],
        resolve
    );
});

let fadeTitle = new ChangeTag("title", "fadeUpTitle");
let fadeSubTitle = new ChangeTag("subTitle", "fadeUpSubTitle");

//タイトルがフェードインする
titleAnimation.then(() => {
    fadeTitle.addTextToHTML("Craft++");
    fadeSubTitle.addTextToHTML("create and craft team");
});
//

//スクロールしたら画面が移り変わる処理の記述
