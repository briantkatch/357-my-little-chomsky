let name = "{{name}}";
let email = "{{email}}";
let carrier_pref = "{{carrier_pref}}";
// Filter out the "no preference" option
if (carrier_pref !== "Rogers" && carrier_pref !== "Videotron" && carrier_pref !== "Fizz") {
    carrier_pref = null;
}
let coverage_pref;
if ("{{coverage_pref}}".includes("widespread")) {
    coverage_pref = true;
} else {
    coverage_pref = false;
}
let travel_pref = false;
if ("{{travel_pref}}" === "Yes") {
    travel_pref = true;
}
let commute = false;
if ("{{commute}}" === "Yes") {
    commute = true;
}
let hotspot = false;
if ("{{hotspot}}" === "Yes") {
    hotspot = true;
}
let social_video = false;
if ("{{social_video}}".includes("often")) {
    social_video = true;
}

// Calculate the user's data need
let neededData = 5;
if (commute) neededData += 5;
if (hotspot) neededData += 10;
if (social_video) neededData += 3;

const plans = [
    { "id": "f-d-5-28", "type": "domestic", "data": 5, "price": 28, "carrier": "Fizz (by Videotron)" },
    { "id": "r-d-10-30", "type": "domestic", "data": 10, "price": 30, "carrier": "Rogers" },
    { "id": "r-d-50-35", "type": "domestic", "data": 50, "price": 35, "carrier": "Rogers" },
    { "id": "r-d-150-45", "type": "domestic", "data": 150, "price": 45, "carrier": "Rogers" },
    { "id": "r-d-200-50", "type": "domestic", "data": 200, "price": 50, "carrier": "Rogers" },
    { "id": "f-r-5-32", "type": "roaming", "data": 5, "price": 32, "carrier": "Fizz (by Videotron)" },
    { "id": "f-r-8-34", "type": "roaming", "data": 8, "price": 34, "carrier": "Fizz (by Videotron)" },
    { "id": "f-r-20-38", "type": "roaming", "data": 20, "price": 38, "carrier": "Fizz (by Videotron)" },
    { "id": "f-r-50-43", "type": "roaming", "data": 50, "price": 43, "carrier": "Fizz (by Videotron)" },
    { "id": "r-r-75-50", "type": "roaming", "data": 75, "price": 50, "carrier": "Rogers" },
    { "id": "r-r-200-65", "type": "roaming", "data": 200, "price": 65, "carrier": "Rogers" }
];

// Set the plan-of-last-resort to the plan with all features/max data
let bestPlanId = plans[plans.length - 1].id;
let bestPlanPrice = plans[plans.length - 1].price;

// Iterate the plans to see if we can find a better one
for (let plan of plans) {
    if (plan.price < bestPlanPrice) {
        // Check if this plan meets the user's data requirement
        if (plan.data < neededData) continue;
        // Check if this plan meets the user's carrier preference
        if (carrier_pref && !plan.carrier.includes(carrier_pref)) continue;
        // Check if the user has a coverage preference (restriction to Rogers)
        if (coverage_pref && plan.carrier !== "Rogers") continue;
        // Check if the user has a travel preference
        if (travel_pref && plan.type !== "roaming") continue;
        // Set preferred plan
        bestPlanId = plan.id;
        bestPlanPrice = plan.price;
    }
}

window.location.href = "https://briantkatch.github.io/357-my-little-chomsky/" + bestPlanId + ".html?neededData=" + neededData + "&travelPref=" + travel_pref + "&name=" + name;