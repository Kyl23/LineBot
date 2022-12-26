import StepLiteralMap from "./LiteralMap.js";

function ParserVariable() { }

ParserVariable.msgParser = (event, state_config) => {
    const msg = event.message.text;
    try {
        return {
            msg,
            "id": event.source.userId,
            "tryEntryStep": state_config ? state_config.state[event.source.userId].step : StepLiteralMap[msg]
        }
    }
    catch {
        console.log(state_config.state ? state_config.state[event.source.userId].step : StepLiteralMap[msg])
        return {
            msg,
            "id": event.source.userId,
            "tryEntryStep": state_config.state ? state_config.state[event.source.userId].step : StepLiteralMap[msg]
        }
    }
}

export default ParserVariable;
