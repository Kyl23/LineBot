import UndefinedState from "../UndefinedState/index.js";
import ParserVariable from "../Utils/ParserVariable.js";

const ExitState = (event, state_config) => {
    const state = state_config.state;
    const { _, id, __ } = ParserVariable.msgParser(event);
    delete state[id];
    UndefinedState(event, state_config);
}

export default ExitState;
