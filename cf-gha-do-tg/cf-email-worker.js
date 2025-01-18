export default {
  async email(message, env, ctx) {

    const allowList = ["alert@example.com"];
    if (!allowList.includes(message.from)) {
      message.setReject("Address not allowed");
      return;
    }

    switch (message.to) {

      case "alert@example.com":
        await fetch("https://api.telegram.org/bot<YOUR_API_TOKEY>/sendMessage", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: 'CHAT_ID',
            text: `${message.from}: ${message.headers.get('subject')}`
          })
        });

        break;

      default:
        message.setReject("Unknown address");
    }
  }
};