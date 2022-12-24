import AddAdmin from "./ManageState/AddAdmin/index.js"
import State from "./Utils/State.js"
import ManageState from "./ManageState/index.js";
import UndefinedState from "./UndefinedState/index.js"
import AddStaff from "./ManageState/AddStaff/index.js";
import RemovePerson from "./ManageState/RemovePerson/index.js";
import EditReservation from "./ManageState/EditReservation/index.js";
import Reserve from "./ReserveState/index.js";
import Draft from "./DraftState/index.js";
import Check from "./CheckState/index.js";

const MessageParse = (event, pushMsg, state_config) => {
    // event.message.text是使用者傳給bot的訊息 準備要回傳的內容 
    const userId = event.source.userId;
    const state = state_config.state[userId] ? state_config.state[userId].step : undefined;

    switch (state) {
        case undefined: {
            UndefinedState(event, state_config);
            return;
        }

        case State.RESERVE: {
            Reserve(event, state_config);
            return;
        }

        case State.RESERVE_TITLE: {
            Reserve(event, state_config);
            return;
        }

        case State.RESERVE_CONTEXT: {
            Reserve(event, state_config);
            return;
        }

        case State.RESERVE_SURE: {
            Reserve(event, state_config);
            return;
        }

        case State.DRAFT: {
            Draft(event, state_config);
            return;
        }

        case State.CHECK: {
            Check(event, state_config);
            return;
        }

        case State.MANAGE: {
            ManageState(event, state_config);
            return;
        }

        case State.MANAGE_ADD_ADMIN: {
            AddAdmin(event, state_config);
            return;
        }

        case State.MANAGE_ADD_STAFF: {
            AddStaff(event, state_config);
            return;
        }

        case State.MANAGE_REMOVE_PERSON: {
            RemovePerson(event, state_config);
            return;
        }

        case State.MANAGE_EDIT_RESERVATION: {
            EditReservation(event, state_config);
            return;
        }

        case State.MANAGE_EDIT_RESERVATION_SHOW: {
            EditReservation(event, state_config);
            return;
        }
        
        default: {
            UndefinedState(event, state_config);
            return;
        }
    }
}

export default MessageParse;