function fetchJSONData() {
    return fetch("./questions.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
            return null; // Return null if there's an error
        });
}

fetchJSONData().then((data) => {
    if (data) {
        const questions = data.data;
        const questionContainer = document.createElement("div");
        document.body.appendChild(questionContainer);

        questions.forEach((question) => {
            const questionElement = document.createElement("p");
            questionElement.textContent = question.question;
            questionContainer.appendChild(questionElement);

            const optionsList = document.createElement("ul");
            questionContainer.appendChild(optionsList);

            for (let i = 1; i <= 4; i++) {
                const option = document.createElement("li");
                option.textContent = question[`option${i}`];
                optionsList.appendChild(option);
            }
        });
    }
});