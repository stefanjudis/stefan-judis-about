(() => {
  const button = document.getElementById('chat-start-btn');
  const submitForm = document.getElementById('chat-register-form');
  const chat = document.getElementById('chat-conversation');
  const chatMessages = document.getElementById('chat-conversation-messages');
  const chatForm = document.getElementById('chat-conversation-form');

  button.addEventListener('click', () => {});

  submitForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = event.target['chat-register-form-email'].value;

    fetch(event.target.action, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    })
      .then(res => res.json())
      .then(response => {
        const { token } = response;

        window.Twilio.Chat.Client.create(token).then(async chatClient => {
          const { host, pathname } = window.location;
          // const uniqueName = `${host}--${pathname}--${email}`.replace('/', '-');
          const uniqueName = `${host}--${pathname}--${email}`.replace('/', '-');

          try {
            const channel = await chatClient.getChannelByUniqueName(uniqueName);

            kickChannelOff(channel);
            console.log(channel);
          } catch (e) {
            const channel = await chatClient.createChannel({
              uniqueName: uniqueName,
              friendlyName: uniqueName
              // isPrivate: true
            });

            kickChannelOff(channel);
          }
        });
      });

    async function kickChannelOff(channel) {
      channel.on('messageAdded', message => {
        // if (message.author !== email) {
        const messageElem = document.createElement('li');
        messageElem.innerHTML = message.body;
        chatMessages.append(messageElem);
        // }
      });

      chat.hidden = false;
      chatForm.addEventListener('submit', event => {
        event.preventDefault();
        channel.sendMessage(event.target['chat-conversation-input'].value);
      });

      console.log(channel.state);

      if (channel.state.status !== 'joined') {
        await channel.join();
      }
    }
  });
})();
