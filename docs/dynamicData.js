document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const neededData = parseFloat(urlParams.get('neededData')) || 10;
    const travelPref = urlParams.get('travelPref') === 'true';

    // Update the user's needed data display
    document.getElementById('neededDataElement').textContent = neededData;

    // Show notice if user didn't request roaming but is shown roaming plan due to best value
    if (window.isRoamingPlan) {
        if (!travelPref) {
            document.getElementById('roamingNotice').style.display = 'block';
        }
    }
});