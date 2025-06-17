import * as readline from "node:readline";
import { stdin, stdout } from "node:process";

const serverInfo = {
  name: "茶",
  version: "1.0.0",
};

const tea = [
  {
    name: "Longjing tea (龍井茶)",
    price: 5.0,
    description:
      "Sometimes called by its literal translated name Dragon Well tea, is a variety of pan-roasted green tea from Zhejiang Province, China",
  },
  {
    name: "Pu'er tea (普洱茶)",
    price: 6.0,
    description:
      "Pu'er or pu-erh[1] is a variety of fermented tea traditionally produced in Yunnan Province, China.",
  },
];

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

function sendResponse(id: number, result: object) {
  const response = {
    result,
    jsonrpc: "2.0",
    id,
  };
  console.log(JSON.stringify(response));
}

(async function main() {
  for await (const line of rl) {
    try {
      const json = JSON.parse(line);
      if (json.jsonrpc === "2.0") {
        if (json.method === "initialize") {
          sendResponse(json.id, {
            protocolVersion: "2025-06-17",
            capabilities: {
              resources: { listChanged: true },
            },
            serverInfo,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
