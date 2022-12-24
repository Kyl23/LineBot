import StepLiteralMap from "./LiteralMap.js";

function ParserVariable() { }

ParserVariable.msgParser = (event, state_config) => {
    const msg = event.message.text;

    return {
        msg,
        "id": event.source.userId,
        "tryEntryStep": state_config ? state_config.state[event.source.userId].step : StepLiteralMap[msg]
    };
}

export default ParserVariable;
