import fs from "fs";

import Action from "../../GlobalAction/Action.js";
import UndefinedState from "../../UndefinedState/index.js";
import ParserVariable from "../../Utils/ParserVariable.js";
import State from "../../Utils/State.js";
import StepGenerator from "../../Utils/StepGenerator.js";
import ManageState from "../index.js";

const AddStaff = (event, state_config, msgMapBreak = false) => {
    const { state, config } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event, msgMapBreak);
    switch (tryEntryStep) {
        case State.MANAGE_ADD_STAFF: {
            let actions = [];
            let replymsg = [];
            for (let key in state) {
                if (state[key].payload["join"]) {
                    actions.push({
                        "type": "message",
                        "label": state[key].payload["join"],
                        "text": key
                    })
                    if (actions.length >= 4) {
                        replymsg.push({
                            type: 'template',
                            altText: '選擇欲加入的員工',
                            template: {
                                type: 'buttons',
                                title: '選擇欲加入的員工',
                                text: 'Please select',
                                actions: actions
                            }
                        })
                        actions = [];
                    }
                }
            }

            if (actions.length === 0) {
                event.reply("暫時無任何申請");
                state[id] = StepGenerator(State.MANAGE, state[id].payload);
                return;
            }

            if (actions.length != 0) {
                replymsg.push({
                    type: 'template',
                    altText: '選擇欲加入的員工',
                    template: {
                        type: 'buttons',
                        title: '選擇欲加入的員工',
                        text: 'Please select',
                        actions: actions
                    }
                })
            }

            replymsg.push({
                type: 'template',
                altText: '其他操作',
                template: {
                    type: 'buttons',
                    title: '其他操作',
                    text: 'Please select',
                    actions: [{
                        "type": "message",
                        "label": "返回",
                        "text": "返回"
                    },
                    {
                        "type": "message",
                        "label": "離開",
                        "text": "離開"
                    }]
                }
            })

            event.reply(replymsg);
            return;
        }

        case Action.BACK: {
            state[id] = StepGenerator(State.MANAGE, state[id].payload);
            ManageState(event, state_config);
            return;
        }

        case Action.EXIT: {
            delete state[id];
            UndefinedState(event, state_config);
            return;
        }

        default: {
            if (!state[msg] || !state[msg].payload["join"]) {
                event.reply("不合法輸入！")
                return;
            }

            config.staff[msg] = state[msg].payload["join"];
            fs.writeFileSync("./config.json", JSON.stringify(config));
            event.reply("操作成功！")

            return;
        }
    }
}

export default AddStaff;
