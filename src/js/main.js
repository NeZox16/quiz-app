let app = document.getElementById('app');

let allOption = document.querySelectorAll('.app__list-item')

let modal = document.querySelector('.modal');

let wer = document.querySelector('.wer'),
    rs = document.querySelector('.rs'),
    rsc = document.querySelector('.rsc');

let btnNext = document.querySelector('.btn-next'),
    modalBtn = document.querySelector('.modal-wrapper__btn')

let appListItem1 = document.querySelector('.option1'),
    appListItem2 = document.querySelector('.option2'),
    appListItem3 = document.querySelector('.option3'),
    appListItem4 = document.querySelector('.option4');

let generatedStr = document.querySelector('.generated-completed-str');

let questionRange = document.getElementById('question-range')

let correctScore = document.querySelector('.correct-score'),
    maxScore = document.querySelector('.max-score')

let range = document.querySelector('.range')

let title = document.querySelector('.question-title');
    
let indexOfPage = 0,
    indexOfQuestion = 0,
    score = 0

let questions = [
    {
        question: '2 + 2 * 2',
        response: [
           '6',
           '8',
           '4',
           '2'
        ],
        isRight: 0
    },
    {
        question: '(30 * 30) / 20',
        response: [
           '30',
           '450',
           '180',
           '45'
        ],
        isRight: 3
    },
    {
        question: '50 * 20 / 1000',
        response: [
           '1',
           '0',
           '10',
           '100'
        ],
        isRight: 0
    },
    {
        question: '8 * 9 * 9',
        response: [
           '594',
           '648',
           '576',
           '720'
        ],
        isRight: 1
    },
    {
        question: 'Do you like this quiz?',
        response: [
           'no',
           'no',
           'yes',
           'no'
        ],
        isRight: 2
    },
];

maxScore.innerHTML = questions.length;

rsc.innerHTML = questions.length

const load = () => {
    title.innerHTML = questions[indexOfQuestion].question;

    appListItem1.innerHTML = questions[indexOfQuestion].response[0]
    appListItem2.innerHTML = questions[indexOfQuestion].response[1]
    appListItem3.innerHTML = questions[indexOfQuestion].response[2]
    appListItem4.innerHTML = questions[indexOfQuestion].response[3]

    
    indexOfPage + 1
    let percent = Math.round(indexOfPage / questions.length * 100)
    console.log(percent);
    range.style.width = `${percent}%`
    rs.innerHTML = indexOfPage
    indexOfPage++
}


let selectedQuestion = [];

const randomQuestions = () => {
    let randomNumQuestion = Math.floor(Math.random() * questions.length)
    let duplicate = false;

    if (indexOfPage === questions.length) {
        overGame()
    } else {
        if (selectedQuestion.length > 0) {
            selectedQuestion.forEach(item => {
                if (item == randomNumQuestion) {
                    duplicate = true
                }
            })
            if (duplicate) {
                randomQuestions()
            } else {
                indexOfQuestion = randomNumQuestion;
                load()
            }
        }
        if (selectedQuestion.length === 0) {
            indexOfQuestion = randomNumQuestion;
            load()
        }
    }
    selectedQuestion.push(indexOfQuestion)

}

const checkAnswer = e => {
    if(e.target.dataset.id == questions[indexOfQuestion].isRight) {
        e.target.classList.add('correct')
        score++
    } else {
        e.target.classList.add('error')
    }
    disabledOption()
}

allOption.forEach(element => {
    element.addEventListener('click', event => checkAnswer(event))
})

const disabledOption = () => {
    allOption.forEach(itemDis => {
        itemDis.classList.add('disabled')
        itemDis.classList.add('error')
        if(itemDis.dataset.id == questions[indexOfQuestion].isRight) {
            itemDis.classList.remove('error')
            itemDis.classList.add('correct')
        }
    })
}

const enabledOption = () => {
    for(let itemEnabled of allOption) {
        itemEnabled.classList.remove('disabled', 'correct', 'error')
    }
}

const validateOption = () => {
    if(!allOption[0].classList.contains('disabled')) {
        btnNext.classList.add('btn-error')
        setTimeout(() => {
            btnNext.classList.remove('btn-error')
        }, 1500)
    } else {
        randomQuestions()
        enabledOption()
    }
}

const overGame = () => {
    modal.classList.add('active')
    range.style.width = '100%'
    if (score < questions.length) {
        generatedStr.innerHTML = 'Try to make the result better'
    } else if (score === questions.length) {
        generatedStr.innerHTML = 'You are best'
    }
    correctScore.innerHTML = score;
}

btnNext.addEventListener('click', () => {
    validateOption()
})

modalBtn.addEventListener('click', () => {
    window.location.reload()
})

randomQuestions()
