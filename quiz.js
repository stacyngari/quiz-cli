
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

const questions = [
    {
        question: "Which language runs directly in a web browser?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "B"
    },
    {
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["const", "static", "let", "define"],
        answer: "C"
    },
    {
        question: "Which array method creates a new array by transforming elements?",
        options: ["forEach()", "map()", "find()", "push()"],
        answer: "B"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Trainer Marking Language",
            "High Text Machine Language",
            "Hyper Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "C"
    },
    {
        question: "Which command displays the current working directory?",
        options: ["ls", "cd", "mkdir", "pwd"],
        answer: "D"
    }
];

function displayQuestion(question, index) {
    console.log(`\nQuestion ${index + 1}: ${question.question}`);

    question.options.forEach((option, i) => {
        console.log(`${String.fromCharCode(65 + i)}. ${option}`);
    });
}

async function getAnswer() {
    let answer;

    while (true) {
        answer = (await rl.question("Your answer (A-D): "))
            .trim()
            .toUpperCase();

        if (["A", "B", "C", "D"].includes(answer)) {
            return answer;
        }

        console.log("Invalid choice. Please enter A, B, C, or D.");
    }
}

async function playGame() {
    let score = 0;
    let elapsedSeconds = 0;
    const playerAnswers = [];

    console.log("\n================================");
    console.log("       JAVASCRIPT TRIVIA");
    console.log("================================");
    console.log(`There are ${questions.length} questions.`);
    console.log("Each correct answer earns 1 point.");

    await rl.question("\nPress Enter to start the quiz...");

    const timer = setInterval(() => {
        elapsedSeconds++;
    }, 1000);

    try {
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];

            displayQuestion(question, i);

            const answer = await getAnswer();
            playerAnswers.push(answer);

            if (answer === question.answer) {
                console.log("Correct! Well done.");
                score++;
            } else {
                const correctOption =
                    question.options[question.answer.charCodeAt(0) - 65];

                console.log(
                    `Incorrect. The correct answer was ${question.answer}. ${correctOption}`
                );
            }

            console.log(`Current score: ${score}/${i + 1}`);
        }
    } finally {
        clearInterval(timer);
    }

    const correctAnswers = playerAnswers.filter(
        (answer, index) => answer === questions[index].answer
    );

    const percentage = Math.round(
        (correctAnswers.length / questions.length) * 100
    );

    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;

    console.log("\n================================");
    console.log("          GAME OVER");
    console.log("================================");
    console.log(`Final score: ${score}/${questions.length}`);
    console.log(`Correct answers: ${correctAnswers.length}`);
    console.log(`Percentage: ${percentage}%`);
    console.log(`Time taken: ${minutes}m ${seconds}s`);

    if (percentage === 100) {
        console.log("Excellent! You got every question correct!");
    } else if (percentage >= 60) {
        console.log("Good job! Keep practicing.");
    } else {
        console.log("Keep learning. You can try again!");
    }
}

async function main() {
    try {
        let playAgain = "Y";

        while (playAgain === "Y") {
            await playGame();

            playAgain = (
                await rl.question("\nWould you like to play again? (Y/N): ")
            ).trim().toUpperCase();

            while (playAgain !== "Y" && playAgain !== "N") {
                playAgain = (
                    await rl.question("Please enter Y or N: ")
                ).trim().toUpperCase();
            }
        }

        console.log("\nThanks for playing!");
    } finally {
        rl.close();
    }
}

main().catch((error) => {
    console.error("Something went wrong:", error);
    process.exitCode = 1;
});

