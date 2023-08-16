// This helper converts a user supplied seed to a Messages[] that our system can understand.

export function seedToMessages(instructions, seedStr) {
    if (typeof(seedStr) != "string") return
    const pattern = /^(.*?):\s*```(.*?)```/gms;
    let matches = [...seedStr.matchAll(pattern)];
    let messages = [{"role": "system", "content": instructions},]

    matches.map((match) => {

        if (match[1] == "User") {
            messages.push({
                role: "user",
                content: match[2]
            });
        } else {
            messages.push({
                role: "assistant",
                content: match[2]
            });
        }


    }); 

    return messages;
}
