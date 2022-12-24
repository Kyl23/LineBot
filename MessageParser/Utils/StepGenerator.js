const stepGenerator = (stepName, payload = false) => {
    return {
        "step": stepName,
        "time": Date.now(),
        "payload": payload ? payload : {}
    }
}

export default stepGenerator