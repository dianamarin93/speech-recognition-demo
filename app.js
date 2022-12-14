const speechRecognitionService =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognitionService = new speechRecognitionService();

const startBtn = document.querySelector(".btn-start");
const textLog = document.querySelector(".text-log");

const dropDown = document.querySelector("#language");
dropDown.addEventListener("change", () => {
  recognitionService.language = determineLanguage();
});

const languages = {
  English: "en-US",
  Romanian: "ro-RO",
};

startBtn.addEventListener("click", () => {
  recognitionService.language = determineLanguage();
  recognitionService.continuous = true;

  recognitionService.onresult = handleResult;

  if (startBtn.classList.contains("btn-pulsating")) {
    stopRecording();
  } else {
    startRecording();
  }
});

function determineLanguage() {
  const selected = document.querySelector("#language").value;
  switch (selected) {
    case "English":
      return languages.English;
    case "Romanian":
      return languages.Romanian;
    default:
      throw new Error("Language not supported");
  }
}

function handleResult(event) {
  const results = [];
  for (const result of event.results) {
    results.push(`${result[0].transcript}`);
  }
  textLog.innerHTML += results.at(-1);
}

function stopRecording() {
  recognitionService.stop();
  startBtn.classList.remove("btn-pulsating");
  textLog.innerHTML += "<br />";
}

function startRecording() {
  recognitionService.start();
  startBtn.classList.add("btn-pulsating");
}
