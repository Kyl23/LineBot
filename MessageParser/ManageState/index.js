import AddAdmin from "./AddAdmin/index.js";

import Action from "../GlobalAction/Action.js";
import State from "../Utils/State.js";
import StepGenerator from "../Utils/StepGenerator.js";
import StepLiteralMap from "../Utils/LiteralMap.js";
import UndefinedState from "../UndefinedState/index.js";
import AddStaff from "./AddStaff/index.js";
import RemovePerson from "./RemovePerson/index.js";
import ParserVariable from "../Utils/ParserVariable.js";
import EditReservation from "./EditReservation/index.js";

const ManageState = (event, state_config) => {
    const { state, config } = state_config;

    const { msg, id, __ } = ParserVariable.msgParser(event);

    const admin = config.admin;
    const staff = config.staff;

    const isAdmin = admin[id];
    const isStaff = staff[id];

    const tryEntryStep = StepLiteralMap[msg]

    switch (tryEntryStep) {
        case State.MANAGE_ADD_ADMIN: {
            if (!isAdmin) return;
            state[id] = StepGenerator(State.MANAGE_ADD_ADMIN, state[id].payload);
            AddAdmin(event, state_config);
            return;
        }

        case State.MANAGE_ADD_STAFF: {
            if (!isAdmin) return;
            state[id] = StepGenerator(State.MANAGE_ADD_STAFF, state[id].payload);
            AddStaff(event, state_config);
            return;
        }

        case State.MANAGE_REMOVE_PERSON: {
            if (!isAdmin) return;
            state[id] = StepGenerator(State.MANAGE_REMOVE_PERSON, state[id].payload);
            RemovePerson(event, state_config);
            return;
        }

        case State.MANAGE_EDIT_RESERVATION_SHOW: {
            state[id] = StepGenerator(State.MANAGE_EDIT_RESERVATION_SHOW, state[id].payload);
            EditReservation(event, state_config);
            return;
        }

        case State.MANAGE_EDIT_RESERVATION: {
            state[id] = StepGenerator(State.MANAGE_EDIT_RESERVATION, state[id].payload);
            EditReservation(event, state_config);
            return;
        }

        case Action.EXIT: {
            delete state[id];
            UndefinedState(event, state_config);
            return;
        }

        default: {
            let actions1 = [
                {
                    "type": "message",
                    "label": "????????????",
                    "text": "????????????"
                }
            ]
            let actions2 = [
                {
                    "type": "message",
                    "label": "??????????????????",
                    "text": "??????????????????"
                },
                {
                    "type": "message",
                    "label": "??????????????????",
                    "text": "??????????????????"
                },
                {
                    "type": "message",
                    "label": "????????????",
                    "text": "????????????"
                },
                {
                    "type": "message",
                    "label": "??????",
                    "text": "??????"
                }
            ];

            if (isAdmin) {
                event.reply([{
                    type: 'template',
                    altText: '????????????',
                    template: {
                        type: 'buttons',
                        title: '????????????',
                        text: 'Please select',
                        actions: actions1
                    }
                }, {
                    type: 'template',
                    altText: '????????????',
                    template: {
                        type: 'buttons',
                        title: '????????????',
                        text: 'Please select',
                        actions: actions2
                    }
                }]);
            }
            else {
                event.reply([{
                    type: 'template',
                    altText: '????????????',
                    template: {
                        type: 'buttons',
                        title: '????????????',
                        text: 'Please select',
                        actions: actions1
                    }
                }])
            }

            return;
        }
    }
}

export default ManageState;
