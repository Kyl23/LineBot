import ParserVariable from "../Utils/ParserVariable.js";
import UndefinedState from "../UndefinedState/index.js";

const Check = (event, state_config) => {
    const { state, config, reserve } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event, state_config);

    switch (tryEntryStep) {
        default: {
            if(msg === 'y'){
                delete state[id];
                delete reserve[id];
                event.reply("已取消");
                return;
            }
            else if(msg === 'n'){
                delete state[id];
                UndefinedState(event, state_config);
                return;
            }

            if (!reserve[id]) {
                event.reply("無預約");
                delete state[id];
                return;
            }
            event.reply([
                `狀態: ${reserve[id]["confirm"] ? "已確認" : "待確認"} \n\n 標題: \n${reserve[id]["title"]} \n\n 內容: \n${reserve[id]["context"]}`,
                {
                    type: 'template',
                    altText: '是否取消',
                    template: {
                        type: 'buttons',
                        title: '是否取消',
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
        }
    }
}

export default Check;