import stepGenerator from "../Utils/StepGenerator.js";
import State from "../Utils/State.js";
import ParserVariable from "../Utils/ParserVariable.js";
import UndefinedState from "../UndefinedState/index.js";

const Draft = (event, state_config) => {
    const { state, config } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event, state_config);

    switch (tryEntryStep) {
        default: {
            if (msg === "離開") {
                delete state[id];
                UndefinedState(event, state_config);
                return;
            }

            if (!state[id].payload["reserve"]) {
                event.reply("無草稿");
                delete state[id];
                return;
            }

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
    }
}

export default Draft;