
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");


let userMessage;
//if your site is not working its beacause your api key is expaierd api is not free its will cost you arround 500rs+ and you are so garreb to purchase that
//note* - its mummys chatgpt account free api which is valid untill november 
//in case of project submit just create an other account and replace the below api key with the newly created api key of that new acccount.

const API_KEY = "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"; 

const  createChatLi = (message, className)=>{

    //create a chat <li> element with passed message and class name .
    const chatLi= document.createElement("li");
    chatLi.classList.add("chat" , className);
    let chatContent = className === "outgoing" ? ` <p></p>` : ` <span class="material-symbols-outlined">
    smart_toy</span> <p></p>`;

    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent= message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p")
    const requestOptions = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY} `
        },
        body: JSON.stringify({
            
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userMessage}]
              
              
        })

    }

    //send post requsent to api get response
    fetch(API_URL,requestOptions).then(res => res.json()).then(data => {
       messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "sorry! something went wrong . try again...";
    }).finally(()=>  chatbox.scrollTo(0,chatbox.scrollHeight));
}

const handleChat= () => {
userMessage =  chatInput.value.trim();

if(!userMessage)return;
chatInput.value = "";


               //append the user message to chat box
             chatbox.appendChild(createChatLi(userMessage, "outgoing"));
             chatbox.scrollTo(0,chatbox.scrollHeight);
                
              setTimeout(()=>{
                //display thinking while waiting for some response
                const incomingChatLi = createChatLi("generating response...", "incoming")
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0,chatbox.scrollHeight);
                   generateResponse(incomingChatLi);
             }, 600)
}

sendChatBtn.addEventListener("click", handleChat);