const input = document.getElementById("input")
const searchBtn = document.getElementById("search")
const resultEl = document.getElementById("result")
const inputWord = document.getElementById("input-word")


function showMeaning(data) {
    let list = document.createElement("div")
    data.forEach((element, index) => {
        let text = `
                <p><b>${index+1}.</b> ${element?.definition}</p>
        `
        list.innerHTML += text
    });
    resultEl.innerHTML = list.innerHTML;
}

async function getMeaning(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data = await response.json()
        if (data?.title) {
            inputWord.innerHTML = `<b class="text-red-500">Sorry, we couldn't find definitions for the word you were looking for</sup></b>`
            return
        }
        const meaning = data[0]?.meanings[0]?.definitions
        showMeaning(meaning)
    } catch (error) {
        inputWord.innerHTML = `<b class="text-red-500">${error}</sup></b>`
    }
}

function showResult() {
    const word = input.value;
    if (!word) {
        inputWord.innerHTML = `<b class="text-red-500">Input Field is required <sup>*</sup></b>`
        return
    }
    inputWord.innerHTML = `<p class="text-violet-500">Meaning or Definitions of <strong>${word}</strong> is :</p>`
    getMeaning(word);

    input.value = ""

}

searchBtn.addEventListener("click", showResult)