const Candidate = require("./../models/Candidate")

exports.applyToJob = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        if (!jobId) {
            return res.status(404).json({ error: "JobId is missing" })
        }

        const candidateId = req.user.id;

        const candidate = await Candidate.findById(candidateId);


        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found with id #" + candidateId })
        }

        const appliedApps = candidate.applications.filter((app) => app.jobId.toString() === jobId)
        console.log(appliedApps)
        if (appliedApps.length > 0) {
            return res.status(400).json({ error: "Already applied to this job." });
        }

        const currentJob = {
            jobId: jobId,
            matchScore: null,
            aiFeedback: null,
            status: "applied"
        }
        candidate.applications.push(currentJob);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        return res.status(500).json({ error: "Server error", err })
    }

}


// candidateId = req.user.id;
exports.getMyProfile = async (req, res) => {
    try {
        const candidateId = req.user.id;

        const candidate = await Candidate.findById(candidateId);
        return res.json(candidate)
    } catch (err) {
        return res.status(500).json({ error: "Server error", err })
    }
}

