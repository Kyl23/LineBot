import StepGenerator from "../Utils/StepGenerator.js"
import ManageState from "../ManageState/index.js";
import State from "../Utils/State.js"
import ParserVariable from "../Utils/ParserVariable.js";
import Reserve from "../ReserveState/index.js";
import Draft from "../DraftState/index.js";
import Check from "../CheckState/index.js";

const UndefinedState = (event, state_config) => {
    const { state, config } = state_config;

    const { msg, id, tryEntryStep } = ParserVariable.msgParser(event);

    const admin = config.admin;
    const staff = config.staff;

    const isAdmin = admin[id];
    const isStaff = staff[id];

    const payload = state[id] ? state[id].payload : false;

    switch (tryEntryStep) {
        case State.FSM: {
            event.reply({
                type: 'image',
                originalContentUrl: 'https://github.com/Kyl23/LineBot/blob/master/fsm.png?raw=true',
                previewImageUrl: 'https://github.com/Kyl23/LineBot/blob/master/fsm.png?raw=true'
            })
            return;
        }

        case State.RESERVE: {
            state[id] = StepGenerator(State.RESERVE, payload);
            Reserve(event, state_config);
            return;
        }

        case State.DRAFT: {
            state[id] = StepGenerator(State.DRAFT, payload);
            Draft(event, state_config);
            return;
        }

        case State.CHECK: {
            state[id] = StepGenerator(State.CHECK, payload);
            Check(event, state_config);
            return;
        }

        case State.MANAGE: {
            if (!isAdmin && !isStaff) return;
            state[id] = StepGenerator(State.MANAGE, payload);
            ManageState(event, state_config);
            return;
        }

        default: {
            let actions = config.functions;
            if (isAdmin || isStaff) {
                actions = actions.concat(config.worker_functions)
            }

            if (msg.startsWith("申請加入")) {
                const wannaAddUser = msg.slice(4);
                if (wannaAddUser === "0000") return; // this is the root user cannot be replace by other
                state[id] = StepGenerator("", payload);
                state[id].payload["join"] = msg.slice(4);
            }

            event.reply([{
                type: 'template',
                altText: 'FSM',
                template: {
                    type: 'buttons',
                    title: 'FSM',
                    text: 'Please select',
                    actions: [{
                        "type": "message",
                        "label": "FSM",
                        "text": "FSM"
                    }]
                }
            }
                , {
                type: 'template',
                altText: '功能',
                template: {
                    type: 'buttons',
                    title: '功能',
                    text: 'Please select',
                    actions: actions
                }
            }]);

            return;
        }
    }
}

export default UndefinedState;