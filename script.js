

let messages = []; // 이 배열에 이전 대화를 저장합니다.

async function openFun(userMessage) {
    messages.push({role: "system", content: "너를 이용하는 사용자는 디지털 약자로, 디지털 기기를 어떻게 다루는지를 잘 알지 못해. 너는 이런 분들을 대상으로 최대한 공손하고 알아듣기 쉽게 질문에 대해 답변해 주며 디지털 기기의 사용 방법을 알려주는 도우미야."},{role: "user", content: "키오스크에서 버튼을 누르는 것이 어려운데, 어떻게 해야해?"},{role: "assistant", content: "버튼을 누르실 때는 손가락을 가볍게 대주시면 됩니다. 힘을 줄 필요는 없어요. 버튼 위에 표시된 내용을 잘 보시고, 원하시는 기능에 해당하는 버튼을 누르시면 됩니다."},{role: "user", content: userMessage}); // 사용자의 메시지를 저장합니다.

    const response = await fetch('http://localhost:3000/getGptResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: messages }) // 이전 대화 전체를 요청에 포함시킵니다.
    });

    const data = await response.json();
    messages.push({role: "assistant", content: data.response}); // GPT-4의 응답을 저장합니다.

    return data.response;
}

async function appendText() {
    const userInput = document.getElementById('userInput').value;
    const chatBox = document.getElementById('chatBox');

    if (userInput.trim() !== "") {
        const userDiv = document.createElement('div');
        userDiv.className = 'message';  
        userDiv.innerText = `사용자: ${userInput}`;
        chatBox.appendChild(userDiv); 
        document.getElementById('userInput').value = "";

        const gptResponse = await openFun(`너를 이용하는 사용자는 디지털 약자로, 디지털 기기를 어떻게 다루는지를 잘 알지 못해. 너는 이런 분들을 대상으로 최대한 공손하고 알아듣기 쉽게 질문에 대해 답변해 주며 디지털 기기의 사용 방법을 알려주는 도우미야. 다음 예시를 통해 어떤 질문이 들어오면 어떻게 답해야하는지를 참고해. <예시 1> 질문: 화면이 작아서 글자가 잘 안 보여요. 어떻게 해야 할까요? 답변: 화면을 잘 보시기 위해서는 화면에 가까이 서시면 좋아요. 또한, 화면 우측 상단에 있는 확대 기능을 이용하시면 글자를 크게 볼 수 있답니다. 확대 기능은 화면을 터치하거나, 디지털 키오스크 옆에 있는 확대 버튼을 누르시면 됩니다. <예시 2> 질문: 결제를 하려는데 어떻게 해야 할까요? 답변: 결제를 하실 때는 키오스크 화면에 나타나는 결제 방법을 선택하시고, 지시에 따라 결제를 진행하시면 됩니다. 주로 카드나 현금 결제 방법을 선택하실 수 있어요. 카드 결제 시 카드를 키오스크에 삽입하거나, NFC 기능을 이용하실 수도 있습니다.  <예시 3> 질문: 결제를 하려고 하는데, NFC가 뭘 말하는지를 모르겠어요.  답변: NFC는 '근거리 무선 통신'이라는 뜻의 'Near Field Communication'의 약어입니다. 이 기술은 장치와 장치 사이의 거리가 매우 가깝거나 접촉할 때 작동하게 됩니다. 예를 들어, 스마트폰을 결제 단말기에 가까이 대면 NFC 기능을 통해 정보를 주고받아 결제를 진행하게 됩니다. 이렇게 해서 카드나 현금 없이도 간편하게 결제를 할 수 있게 도와주는 기능이죠. 하지만, NFC 기능을 사용하기 위해서는 당신의 스마트폰이 NFC를 지원해야하며, 설정에서 NFC 기능이 켜져 있어야 합니다. 기능을 찾는데 어려움이 있으시다면, 언제든 도움을 청하시면 도와드리겠습니다. <예시 4>질문: 잘못 입력했는데 취소하거나 다시 시작하려면 어떻게 해야 할까요? 답변:  잘못 입력하신 경우, 키오스크 화면에 나타나는 이전 단계로 돌아가거나, 처음부터 다시 시작하실 수 있습니다. 화면에 나타나는 '이전' 또는 '다시 시작' 버튼을 누르시면 됩니다. 그리고 다시 제대로 입력하시면 됩니다. <예시 5> 질문: 카카오톡으로 영상통화를 하려면 어떻게 해야 할까요? 답변: 카카오톡으로 영상통화를 하실 때는 다음과 같이 진행하시면 됩니다. 먼저, 카카오톡 앱을 실행해주세요. 이후, 대화 목록에서 영상통화를 하고자 하는 상대방을 선택해주세요. 다음으로, 프로필 화면 하단에 있는 통화하기 버튼을 눌러주세요. 페이스톡 버튼을 누르세요. 수락하면 영상통화가 시작됩니다.
        질문: ${userInput}`);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'message';
        responseDiv.innerText = `김아무개: ${gptResponse}`;
        chatBox.appendChild(responseDiv);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    document.getElementById('userInput').value = "";
}
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // 기본 동작(여기서는 줄 바꿈)을 취소합니다.
        appendText(); // appendText 함수를 호출합니다.
    }
});
