async function sendConnectionRequests() {
  const DELAY = 2000;
  var connects = 0;
  var fails = 0;

  function selectConnectButtons() {
    return [...document.querySelectorAll("button span")].filter((a) =>
      a.textContent.includes("Connect")
    );
  }

  function selectSendButtons() {
    return [...document.querySelectorAll("button span")].filter((a) =>
      a.textContent.includes("Send")
    );
  }

  function selectOtherButton() {
    return [...document.querySelectorAll("button")].filter((a) =>
      a.textContent.includes("Other")
    );
  }

  async function click(e) {
    return new Promise((resolve) => {
      setTimeout(() => {
        e.click();
        resolve();
      }, DELAY);
    });
  }

  async function clickAll() {
    let connectButtons = await selectConnectButtons();

    for (const button of connectButtons) {
      try {
        await click(button);

        if (document.getElementsByClassName("ember-text-field")[0]) {
          document.getElementsByClassName("artdeco-button__text")[0].click();
        }

        let sendButtons = await selectSendButtons();

        if (sendButtons) {
          for (s of sendButtons) {
            await s.click();

            connects++;
          }
        }

        let otherBtn = await selectOtherButton();

        if (otherBtn) {
          for (o of otherBtn) {
            await o.click();

            new Promise((resolve) => {
              setTimeout(async () => {
                let connButton = await selectConnectButtons();

                await connButton[0].click();
                resolve();
              }, DELAY);
            });

            let sendButton = await selectSendButtons();

            await sendButton[0].click();
            connects++;
          }
        }
      } catch (err) {
        fails++;
      }
    }
  }

  do {
    await clickAll();
  } while (selectConnectButtons().length != 0);
}

sendConnectionRequests();
