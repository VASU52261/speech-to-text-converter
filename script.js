const resultElement = document.getElementById("result");
let recognition;

// START
function startConverting() {

    if ('webkitSpeechRecognition' in window) {

        recognition = new webkitSpeechRecognition();

        setupRecognition(recognition);

        recognition.start();
    } else {
        alert("Speech recognition not supported in this browser");
    }
}

// SETUP
function setupRecognition(recognition) {

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {

        const { finalTranscript, interimTranscript } =
            processResult(event.results);

        resultElement.innerHTML = finalTranscript + interimTranscript;
    };
}

// PROCESS RESULT
function processResult(results) {

    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = 0; i < results.length; i++) {

        let transcript = results[i][0].transcript
            .replace(/\n/g, "<br>");

        if (results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }
    }

    return { finalTranscript, interimTranscript };
}

// STOP
function stopConverting() {
    if (recognition) {
        recognition.stop();
    }
}
