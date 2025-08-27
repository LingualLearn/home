document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");
  const optionsContainer = document.getElementById("optionsContainer");
  const addOptionBtn = document.getElementById("addOptionBtn");
  const preview = document.getElementById("quizPreview");
  const previewList = document.getElementById("quizPreviewList");
  const quizVisibility = document.getElementById("quizVisibility");
  const generatedCodeContainer = document.getElementById("generatedCode");
  const joinCodeValue = document.getElementById("joinCodeValue");
  const finishQuizBtn = document.getElementById("finishQuizBtn");

  let quiz = {
    title: "Custom Quiz",
    questions: []
  };

  // ✅ Add another option to a question form
  addOptionBtn.addEventListener("click", () => {
    const index = optionsContainer.querySelectorAll(".form-group").length + 1;
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `
      <label class="form-label">Option ${index}</label>
      <input type="text" class="form-input" name="option" placeholder="Enter option">
    `;
    optionsContainer.appendChild(div);
  });

  // ✅ Handle "Save Question"
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const questionText = document.getElementById("question").value.trim();
    const optionInputs = optionsContainer.querySelectorAll("input[name='option']");
    const options = [...optionInputs].map(opt => opt.value.trim()).filter(Boolean);
    const correctAnswer = document.getElementById("correctAnswer").value.trim();

    if (!questionText || options.length < 2 || !correctAnswer) {
      alert("⚠️ Please complete the question, add at least 2 options, and a correct answer.");
      return;
    }

    // Add to quiz
    quiz.questions.push({
      question: questionText,
      options: options,
      correctAnswer: correctAnswer
    });

    // Reset form
    quizForm.reset();
    optionsContainer.innerHTML = `
      <div class="form-group">
        <label class="form-label">Option 1</label>
        <input type="text" name="option" class="form-input" placeholder="Enter option">
      </div>
      <div class="form-group">
        <label class="form-label">Option 2</label>
        <input type="text" name="option" class="form-input" placeholder="Enter option">
      </div>
    `;

    // Update Preview
    updatePreview();
  });

  // ✅ Update Preview Display
  function updatePreview() {
    preview.classList.remove("hidden");
    previewList.innerHTML = "";

    quiz.questions.forEach((q, idx) => {
      const div = document.createElement("div");
      div.className = "dictionary-entry";
      div.innerHTML = `
        <div class="entry-header">
          <div class="entry-words">
            <div class="entry-foreign">${idx + 1}. ${q.question}</div>
            <div class="entry-english">Correct: ${q.correctAnswer}</div>
          </div>
        </div>
        <div class="entry-details">
          ${q.options.map(opt => `<div class="detail-value">- ${opt}</div>`).join("")}
        </div>
      `;
      previewList.appendChild(div);
    });
  }

  // ✅ Handle "Finish Quiz"
  finishQuizBtn.addEventListener("click", () => {
    if (quiz.questions.length === 0) {
      alert("⚠️ Please add at least one question before finishing.");
      return;
    }

    const visibility = quizVisibility.value;
    const savedQuizzes = JSON.parse(localStorage.getItem("customQuizzes") || "{}");
    let joinCode = null;

    if (visibility === "private") {
      // Generate unique join code
      joinCode = generateJoinCode();
      savedQuizzes[joinCode] = quiz;
      generatedCodeContainer.classList.remove("hidden");
      joinCodeValue.textContent = joinCode;
    } else {
      // Save with a timestamp-based id
      const publicCode = "PUBLIC_" + Date.now();
      savedQuizzes[publicCode] = quiz;
      alert("🌍 Your quiz has been published publicly!");
    }

    // Save quizzes in localStorage
    localStorage.setItem("customQuizzes", JSON.stringify(savedQuizzes));

    if (joinCode) {
      alert(`✅ Quiz saved! Share this code with your students: ${joinCode}`);
    }
  });

  // ✅ Utility: Generate Random Join Code
  function generateJoinCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
});
