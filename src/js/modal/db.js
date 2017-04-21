/**
 * Created by Mike on 04-Apr-17.
 */

const DATA_SET = new Set();
const PROPERTIES_SET = new Set();

d3.csv("./csv/data.csv", function (csv) {

    if (csv.length === 0) {
        alert("No Data found in CSV File");
        return;
    }

    for (let [k, v] of Object.entries(csv[0])) {
        PROPERTIES_SET.add(k.toLowerCase());
    }

    csv.forEach(function (row) {
        let patient = new Patient(row.P_ID);
        for (let [k, v] of Object.entries(row)) {
            let value = parseValueToType(v.trim().toLowerCase());
            patient.add(k.trim().toLowerCase(), value);
        }

        DATA_SET.add(patient);
    });

    console.log(`DATA_SET.size : ${DATA_SET.size}`);
    console.log(`PROPERTIES_MAP.size : ${PROPERTIES_SET.size}`);
    initApp(DATA_SET);
});

function executeQuery(dataset, property, operator, query1, query2 = "") {
    let subDataset = new Set();
    for (let p of dataset) {
        let value = p.data.get(property);
        if (performComparisionOperation(operator, value, query1, query2)) {
            subDataset.add(p);
        }
    }

    return subDataset;
}

function getProperties() {
    return PROPERTIES_SET;
}

function findProperty(property) {
    if (!property) {
        console.log(`findProperty function passed parameter string value is invalid. string : ${property}`);
        return;
    }

    for (let p of PROPERTIES_SET) {
        if (p === property) {
            console.log(`property found: ${p} for ${property}`);
            return p;
        }
    }
}