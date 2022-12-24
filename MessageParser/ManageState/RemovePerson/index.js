import fs from "fs";
import ExitState from "../../GlobalAction/Exit.js";
import ParserVariable from "../../Utils/ParserVariable.js";

import Action from "../../GlobalAction/Action.js";
import State from "../../Utils/State.js";
import StepGenerator from "../../Utils/StepGenerator.js";
import ManageState from "../index.js";

const RemovePerson = (event, state_config, msgMapBreak = false) => {
    const { state, config } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event, msgMapBreak);

    switch (tryEntryStep) {
        case State.MANAGE_REMOVE_PERSON: {
            let actions = [];
            if (config.admin[id] === "0000") {
                for (let key in config.admin) {
                    if (config.admin[key] === "0000") continue;
                    actions.push({
                        "type": "message",
                        "label": `${config.admin[key]}-Admin`,
                        "text": `${key}-admin`
                    })
                }
            }

            for (let key in config.staff) {
                actions.push({
                    "type": "message",
                    "label": `${config.staff[key]}-Staff`,
                    "text": `${key}-staff`
                })
            }

            if (actions.length === 0) {
                event.reply("暫時無任何人員");
                state[id] = StepGenerator(State.MANAGE, state[id].payload);
                return;
            }

            actions.push({
                "type": "message",
                "label": "返回",
                "text": "返回"
            })

            actions.push({
                "type": "message",
                "label": "離開",
                "text": "離開"
            })

            event.reply({
                type: 'template',
                altText: '選擇欲刪除人員',
                template: {
                    type: 'buttons',
                    title: '選擇欲刪除人員',
                    text: 'Please select',
                    actions: actions
                }
            });
            return;
        }

        case Action.BACK: {
            state[id] = StepGenerator(State.MANAGE, state[id].payload);
            ManageState(event, state_config);
            return;
        }

        case Action.EXIT: {
            ExitState(event, state_config);
            return;
        }

        default: {
            const split_msg = msg.split("-");

            if (split_msg.length < 2 || !config[split_msg[1]] || !config[split_msg[1]][split_msg[0]] || (split_msg[1] === "admin" && admin[id] != "0000")) {
                event.reply("不合法輸入！")
                return;
            }

            delete config[split_msg[1]][split_msg[0]]
            fs.writeFileSync("./config.json", JSON.stringify(config));

            event.message.text = State.MANAGE_REMOVE_PERSON;
            RemovePerson(event, state_config, true);
            return;
        }
    }
}

export default RemovePerson;
