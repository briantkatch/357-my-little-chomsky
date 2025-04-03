function setUserDataCategory(neededData) {
    // Mark all categories as inactive
    document.querySelectorAll('.usage-category').forEach(cat => {
        cat.classList.remove('active');
    });

    // Select the appropriate category based on data needed
    if (neededData < 5) {
        document.getElementById('below-average-usage').classList.add('active');
    } else if (neededData >= 5 && neededData < 15) {
        document.getElementById('average-usage').classList.add('active');
    } else if (neededData >= 15 && neededData < 20) {
        document.getElementById('above-average-usage').classList.add('active');
    } else {
        document.getElementById('high-usage').classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const neededData = parseFloat(urlParams.get('neededData')) || 10;
    const travelPref = urlParams.get('travelPref') === 'true';

    // Update the user's needed data display
    document.getElementById('neededDataElement').textContent = neededData;

    // Show notice if user didn't request roaming but is shown roaming plan due to best
    // value
    if (window.isRoamingPlan) {
        if (!travelPref) {
            document.getElementById('roamingNotice').style.display = 'block';
        }
    }

    // Set user's data category based on their needed data
    setUserDataCategory(neededData);

    // Step navigation variables
    let currentStep = 1;
    const totalSteps = 4;

    // DOM elements
    const stepContainers = document.querySelectorAll('.step-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressSteps = document.querySelectorAll('.progress-step');

    // Initialize step navigation
    updateStepUI();

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', goToPreviousStep);
    nextBtn.addEventListener('click', goToNextStep);

    // Functions for step navigation
    function goToNextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepUI();
        }
    }

    function goToPreviousStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    }

    function resetToFirstStep() {
        currentStep = 1;
        updateStepUI();
    }

    function updateStepUI() {
        // Update step containers visibility
        stepContainers.forEach((container, index) => {
            container.style.display = (index + 1 === currentStep) ? 'block' : 'none';
        });

        // Update navigation buttons
        prevBtn.style.display = (currentStep > 1) ? 'block' : 'none';
        nextBtn.style.display = (currentStep < totalSteps) ? 'block' : 'none';

        // Update progress indicator
        progressSteps.forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Scroll to top of the container
        window.scrollTo(0, 0);
    }
});