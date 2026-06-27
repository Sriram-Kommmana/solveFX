const originalFetch = window.fetch;
let currentSubmissionId = null;

window.fetch = async function (...args) {

    const response = await originalFetch.apply(this, args);

    try {
        const url = String(args[0]);
        // --------------------------------------------
        // Detect Submit Request
        // --------------------------------------------
        if (url.includes("/submit/")) {
            const submitData = await response.clone().json();
            currentSubmissionId = String(submitData.submission_id);
            console.log("Submission:", currentSubmissionId);
            return response;
        }

        // --------------------------------------------
        // Detect Check Request
        // --------------------------------------------
        const match = url.match(/submissions\/detail\/(\d+)/);
        if (!match)
            return response;

        const checkSubmissionId = match[1];

        // Ignore old submissions
        if (checkSubmissionId !== currentSubmissionId)
            return response;

        const data = await response.clone().json();

        // Wait until judging finishes
        if (!data.finished)
            return response;

        window.postMessage({
            source: "SolveFX",
            type: "VERDICT",
            verdict: data.status_msg,
            submissionId: currentSubmissionId,
            runtime: data.display_runtime,
            memory: data.memory,
            runtimePercentile: data.runtime_percentile,
            memoryPercentile: data.memory_percentile
        });

        currentSubmissionId = null;

    }
    catch (err) {
        console.error("SolveFX:", err);
    }

    return response;

};