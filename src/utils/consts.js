


export const GET_NODES = {
    message_id: "1",
    command: "get_nodes"
}

export const DISCOVER = {
    message_id: "2",
    command: "discover"
}

export const START_LISTENING = () => {
    return {
        message_id: "3",
        command: "start_listening"
    }
}


export const GET_NODE = (nodeId) => {
    return {
        message_id: "4",
        command: "get_node",
        args: {
            node_id: nodeId
        }
    }
}

export const REMOVE_NODE = (nodeId) => {
    return {
        message_id: "5",
        command: "remove_node",
        args: {
            node_id: nodeId
        }
    }
}


export const COMMISSION_WITH_CODE = (qrCode) => {
    return {
        message_id: "6",
        command: "commission_with_code",
        args: {
            code: qrCode
        }
    }
}

export const DEVICE_COMMAND = (nodeId, commandName) => {
    return {
        message_id: "7",
        command: "device_command",
        args: {
            node_id: nodeId,
            endpoint_id: 1,
            cluster_id: 6, //OnOff
            command_name: commandName,// On,Off or Toggle
            payload: {}
        }
    }
}

export const COMMISSION_ON_NETWORK = (pinCode) => {
    return {
        message_id: "8",
        command: "commission_on_network",
        args: {
            "setup_pin_code": pinCode
        }
    }
}
