sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("evaristo.profile.chatbot.controller.Main", {
    onInit: function () {
      const oModel = new JSONModel({
        currentQuestion: "",
        messages: [
          {
            sender: "bot",
            text: "Hello, I am Evaristo's Profile ChatBot. Ask me anything about Evaristo's profile."
          }
        ]
      });

      this.getView().setModel(oModel);
    },

    _scrollToBottom: function () {
      const oList = this.byId("chatMessages");

      if (oList && oList.getItems().length > 0) {
        setTimeout(() => {
          oList.scrollToIndex(oList.getItems().length - 1);
        }, 100);
      }
    },
    formatSenderTitle: function (sSender) {
      return sSender === "user" ? "You" : "ChatBot";
    },

    onSendQuestion: async function () {
      const oModel = this.getView().getModel();
      const sQuestion = (oModel.getProperty("/currentQuestion") || "").trim();

      if (!sQuestion) {
        MessageToast.show("Please enter a question.");
        return;
      }

      const aMessages = oModel.getProperty("/messages");

      aMessages.push({
        sender: "user",
        text: sQuestion
      });

      oModel.setProperty("/messages", aMessages);
      oModel.setProperty("/currentQuestion", "");

      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          
          body: JSON.stringify({
            input: {
              question: sQuestion
            }
          })
        });

        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }

        const data = await response.json();

        aMessages.push({
          sender: "bot",
          text: data.answer || "No answer returned by backend."
        });

        oModel.setProperty("/messages", aMessages);
        this._scrollToBottom();
      } catch (e) {
        aMessages.push({
          sender: "bot",
          text: "Error calling backend: " + e.message
        });

        oModel.setProperty("/messages", aMessages);
        MessageBox.error("Error calling service: " + e.message);
      }
    }
  });
});