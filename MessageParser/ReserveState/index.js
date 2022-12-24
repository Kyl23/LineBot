import stepGenerator from "../Utils/StepGenerator.js";
import State from "../Utils/State.js";
import ParserVariable from "../Utils/ParserVariable.js";
import UndefinedState from "../UndefinedState/index.js";

const Reserve = (event, state_config) => {
    const { state, config, reserve } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event, state_config);

    switch (tryEntryStep) {
        case State.RESERVE_TITLE: {
            if (msg === "離開") {
                delete state[id];
                UndefinedState(event, state_config);
                return;
            }

            state[id].payload["reserve"] = { "title": msg, "context": "" };
            state[id] = stepGenerator(State.RESERVE_CONTEXT, state[id].payload);
            event.reply("請輸入預約內容， 欲退出請輸入退出");
            return;
        }

        case State.RESERVE_CONTEXT: {
            if (msg === "離開") {
                delete state[id];
                UndefinedState(event, state_config);
                return;
            }

            state[id].payload["reserve"]["context"] = msg;
            state[id] = stepGenerator(State.RESERVE_SURE, state[id].payload);
            event.reply([
                `標題: \n${state[id].payload["reserve"]["title"]}`,
                `內容: \n${state[id].payload["reserve"]["context"]}`,
                {
                    type: 'template',
                    altText: '是否送出',
                    template: {
                        type: 'buttons',
                        title: '是否送出',
                        text: 'Please select',
                        actions: [{
                            "type": "message",
                            "label": "是",
                            "text": "y"
                        }, {
                            "type": "message",
                            "label": "否",
                            "text": "n"
                        }]
                    }
                }
            ]);

            return;
        }

        case State.RESERVE_SURE: {
            if (msg === "y"){
                event.reply("預約待確認， 請於1個工作天後查詢狀態\n 注意：重新預約將覆蓋原有預約！");
                reserve[id] = state[id].payload["reserve"];
                delete state[id].payload["reserve"]
            }
            else
                event.reply("已存入草稿, 點擊離開、新草稿覆蓋、兩小時後 將被刪除");

            state[id] = stepGenerator(State.UndefinedState, state[id].payload);

            return;
        }

        default: {
            state[id] = stepGenerator(State.RESERVE_TITLE, state[id].payload);
            event.reply("請輸入預約標題， 欲退出請輸入退出");
            return;
        }
    }
}

export default Reserve;