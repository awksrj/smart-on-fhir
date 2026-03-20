// app.js - Main app logic (runs after authorization)

FHIR.oauth2.ready().then(function(client) {
    
    // === Fetch and display current patient ===
    client.patient.read().then(
        function(pt) {
            document.getElementById("patient").innerText = JSON.stringify(pt, null, 4);
        },
        function(error) {
            document.getElementById("patient").innerText = "Error: " + error.stack;
        }
    );
    
    // === Fetch MedicationRequests + resolve medication details ===
    client.request("/MedicationRequest?patient=" + client.patient.id, {
        resolveReferences: ["medicationReference"],  // Pulls in full Medication resources
        graph: true
    })
    
    // Guard against empty results
    .then(function(data) {
        if (!data.entry || !data.entry.length) {
            throw new Error("No medications found for the selected patient");
        }
        return data.entry;
    })
    
    // Display medications
    .then(
        function(meds) {
            document.getElementById("meds").innerText = JSON.stringify(meds, null, 4);
        },
        function(error) {
            document.getElementById("meds").innerText = "Error: " + error.stack;
        }
    );

}).catch(function(err) {
    // This catches if ready() fails (e.g., not launched via SMART)
    console.error(err);
    document.getElementById("patient").innerText = "Authorization failed. Did you launch via the SMART sandbox?";
});