gameOn = false

const btnList = ["green", "red", "yellow", "blue"];
var playerOrder = []
var clickOrder = []
var playerLevel = 1

function playSound(name, before, exe) {
    new Audio(before + name + exe).play()
}

function anim(element, animation, time) {
    element.addClass(animation)
    setTimeout(() => {
        element.removeClass(animation)
    }, time)
}

function gameOver() {
    gameOn = false
    anim($("body"), "game-over", 2000)
    playerLevel = 1;
    clickOrder = [];
    playerOrder = [];
    $(".header h1").text("Game Over. click Restart")
    removeBtnListener(".btn", "click")
    $(document).off("click")
    setTimeout(() => {
        playGame();
    }, 1000)


}

function removeBtnListener(button, listener) {
    $(button).off(listener)
}

function btnPushAnimation(element, list, animation, time) {
    element = $(element)
    list.push(element.attr("id"));
    anim(element, animation, time)
}

function chickOrder() {
    for (let i = 0; i < playerOrder.length; i++) {
        if (playerOrder[i] !== clickOrder[i]) {
            gameOver()
            break
        }
    }

    if (gameOn && (playerOrder.length === clickOrder.length)){
        playerOrder = []
        playerLevel++
        $(".header h1").text("Level " + playerLevel)
        setTimeout(()=>{nextBtn();}, 600)

    } else if (gameOn) {
        // setTimeout(()=>{}, 1000)
        allowPlayerClick()
    }

}
function allowPlayerClick() {
    $(".btn").on("click", (e) => {
        playSound(e.target.id, "../sounds/", ".mp3")
        btnPushAnimation(e.target, playerOrder, "player-click", 400)
        removeBtnListener(".btn", "click")
        chickOrder()
    })
}
function nextBtn() {
    element = btnList[Math.floor(Math.random() * btnList.length)]
    playSound(element, "../sounds/", ".mp3")
    btnPushAnimation($("#" + element), clickOrder, "next-btn", 500)
    allowPlayerClick()
}

function playGame() {
    $(document).on("click", () => {
        if (!gameOn) {
            gameOn = true;
            $(".header h1").text("Level " + playerLevel)
            nextBtn()
        }
    })
}

playGame()