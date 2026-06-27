function handleVerdict(data) {
    switch(data.verdict){

        case "Accepted":
            playSound("accepted");
            showOverlay("accepted", data);
            break;

        case "Wrong Answer":
            playSound("wrong");
            showOverlay("wrong", data);
            break;

        case "Time Limit Exceeded":
            playSound("tle");
            showOverlay("tle", data);
            break;

        case "Runtime Error":
            playSound("runtime");
            showOverlay("runtime", data);
            break;

        case "Memory Limit Exceeded":
            playSound("memory");
            showOverlay("memory", data);
            break;

        case "Compile Error":
            playSound("compile");
            showOverlay("compile", data);
            break;

    }
}