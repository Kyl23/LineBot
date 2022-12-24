import Action from "../../GlobalAction/Action.js";
import UndefinedState from "../../UndefinedState/index.js";
import LiteralMap from "../../Utils/LiteralMap.js";
import ParserVariable from "../../Utils/ParserVariable.js";
import State from "../../Utils/State.js";
import stepGenerator from "../../Utils/StepGenerator.js";

const EditReservation = (event, state_config) => {
    const { state, config, reserve } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event, state_config);

    switch (tryEntryStep) {
        case State.MANAGE_EDIT_RESERVATION: {
            if (LiteralMap[msg] === Action.EXIT) {
                delete state[id];
                UndefinedState(event, state_config);
                return;
            }

            if (msg === "刷新") {
                state[id] = stepGenerator(State.MANAGE_EDIT_RESERVATION_SHOW, state[id].payload);
                EditReservation(event, state_config);
                return;
            }

            if (typeof msg !== 'string' || !reserve[msg.slice(1)]) {
                event.reply("不合法輸入");
                return;
            }

            if (msg[0] === "A") {
                reserve[msg.slice(1)]["confirm"] = true;
                event.reply("操作成功");
            }
            else if (msg[0] === "R") {
                reserve[msg.slice(1)]["confirm"] = false;
                event.reply("操作成功");
            }
            else if (msg[0] === "D") {
                delete reserve[msg.slice(1)]
                event.reply("操作成功");
            }
            else {
                event.reply("不合法輸入");
            }

            return;
        }

        default: {
            const reserve_template = []

            for (let key in reserve) {
                reserve_template.push({
                    type: 'template',
                    altText: reserve[key]["title"],
                    template: {
                        type: 'buttons',
                        title: reserve[key]["title"],
                        text: reserve[key]["context"],
                        actions: [{
                            "type": "message",
                            "label": "接受",
                            "text": `A${key}`
                        }, {
                            "type": "message",
                            "label": "拒絕",
                            "text": `R${key}`
                        }, {
                            "type": "message",
                            "label": "刪除",
                            "text": `D${key}`
                        }]
                    }
                })
            }
            reserve_template.push({
                type: 'template',
                altText: '其他操作',
                template: {
                    type: 'buttons',
                    title: '其他操作',
                    text: 'Please select',
                    actions: [
                        {
                            "type": "message",
                            "label": "刷新",
                            "text": "刷新"
                        },
                        {
                            "type": "message",
                            "label": "離開",
                            "text": "離開"
                        }]
                }
            })

            state[id] = stepGenerator(State.MANAGE_EDIT_RESERVATION, state[id].payload);
            event.reply(reserve_template)
            return;
        }
    }
}

export default EditReservation;