const {middleware_usage} = require("./../middleware/demo_middleware")
const {verifyToken, requireAdmin} = require("./../middleware/auth")
const express = require('express')
const router = express.Router();

const {getAllJobs, getJobById, createJob} = require("./../controllers/jobControllers")

router.post("/", verifyToken,requireAdmin, createJob)
router.get("/", verifyToken, getAllJobs)
router.get("/:id", verifyToken, getJobById)

module.exports = router; 