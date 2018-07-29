function existValue(classNumber, schoolNumber, name) {
    if ((classNumber === '') || (schoolNumber === '') || (name === '')) {
        if (classNumber === '') {
            alert("没有输入班级！");
            return false;
        }
        if (schoolNumber === '') {
            alert("没有输入学号！");
            return false;
        }
        if (name === '') {
            alert("没有输入姓名！");
            return false;
        }
    }
}

function getAnswers() {
    return [
        {
            name: document.getElementById("file_1_1"),
            answer: '统一建模语言'
        },
        {
            name: document.getElementById("file_1_2_1"),
            answer: '封装性'
        },
        {
            name: document.getElementById("file_1_2_2"),
            answer: '继承性'
        },
        {
            name: document.getElementById("file_1_2_3"),
            answer: '多态性'
        },
        {
            name: document.getElementsByName("radio_1"),
            answer: 'B'
        },
        {
            name: document.getElementsByName("radio_2"),
            answer: 'A'
        },
        {
            name: document.getElementsByName("interest_1"),
            answer: 'ABD'
        },
        {
            name: document.getElementsByName("interest_2"),
            answer: 'ABC'
        },
        {
            name: document.getElementsByName("gender_1"),
            answer: '错'
        },
        {
            name: document.getElementsByName("gender_2"),
            answer: '对'
        },
        {
            name: document.getElementById("file_5"),
            answer: '模型是对现实世界的简化和抽象,模型是对所研究的系统、过程、事物或概念的一种表达形式。可以是物理实体;可以是某种图形;或者是一种数学表达式。'
        }
    ]
}

function getAnswer(header, answers) {
    for (var i = 0; i < answers.length; i++) {
        if (header === answers[i].name) {
            return answers[i].answer;
        }
    }
}

function existText(text, answers) {
    if (text.value === getAnswer(text, answers)) {
        return 10;
    }
    return 0;
}

function existRadios(radios, answers) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value === getAnswer(radios, answers)) {
                return 5;
            }
        }
    }
    return 0;
}

function existCheckbox(names, answers) {
    var answer = "";
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        if (name.checked) {
            answer += name.value;
        }
    }
    if (answer === getAnswer(names, answers)) {
        return 15;
    }
    return 0;
}

document.getElementById("button").addEventListener('click', function(){
    var answers = getAnswers();
    var classNUmber = document.getElementById("classNumber").value;
    var schoolNumber = document.getElementById("schoolNumber").value;
    var name = document.getElementById("name").value;
    if (existValue(classNUmber, schoolNumber, name) === false)
        return false;
    var interests = ['interest_1', 'interest_2'];
    var radios = ['radio_1', 'radio_2', 'gender_1', 'gender_2'];
    var texts = ['file_1_1', 'file_1_2_1', 'file_1_2_2', 'file_1_2_3', 'file_5'];
    var grade = getGrade(interests, answers, radios, texts);
    document.getElementById("grade").value = grade;
},false);
    
function getGrade(interests, answers, radios, texts) {
    var grade = 0;
    for (var i = 0; i < radios.length; i++) {
        grade += existCheckbox(document.getElementsByName(interests[i]), answers);
        grade += existRadios(document.getElementsByName(radios[i]), answers);
    }
    for (var i = 0; i < texts.length; i++) {
        grade += existText(document.getElementById(texts[i]), answers);
    }
    return grade;
}
