// Define the metro stations and their connections (graph)
const metroStations = {
  'Namma Metro Station': {
    'MG Road Station': 10,
    'Jayanagar Station': 5,
  },
  'MG Road Station': {
    'Namma Metro Station': 10,
    'Jayanagar Station': 10,
    'Lakshmi Nagar Station': 20,
  },
  'Jayanagar Station': {
    'Namma Metro Station': 5,
    'MG Road Station': 10,
    'Lakshmi Nagar Station': 10,
    'Peenya Industry Station': 20,
  },
  'Lakshmi Nagar Station': {
    'MG Road Station': 20,
    'Jayanagar Station': 10,
    'Peenya Industry Station': 10,
    'Silk Board Station': 30,
  },
  'Peenya Industry Station': {
    'Jayanagar Station': 20,
    'Lakshmi Nagar Station': 10,
    'Silk Board Station': 20,
  },
  'Silk Board Station': {
    'Lakshmi Nagar Station': 30,
    'Peenya Industry Station': 20,
    'KR Puram Station': 20,
  },
  'KR Puram Station': {
    'Silk Board Station': 20,
    'Hosahalli Station': 20,
  },
  'Hosahalli Station': {
    'KR Puram Station': 20,
    'Sarjapur Road Station': 20,
  },
  'Sarjapur Road Station': {
    'Hosahalli Station': 20,
    'Kengeri Station': 20,
  },
  'Kengeri Station': {
    'Sarjapur Road Station': 20,
    'Yelagirinagar Station': 20,
  },
  'Yelagirinagar Station': {
    'Kengeri Station': 20,
    'Mahadevapura Station': 20,
  },
  'Mahadevapura Station': {
    'Yelagirinagar Station': 20,
    'Hosakote Station': 20,
  },
  'Hosakote Station': {
    'Mahadevapura Station': 20,
    'Attibele Station': 20,
  },
  'Attibele Station': {
    'Hosakote Station': 20,
  },
};

// Function to calculate the shortest route and fare
function calculate() {
  // Get the source and destination stations from the dropdowns
  const sourceStation = document.getElementById('source').value;
  const destinationStation = document.getElementById('destination').value;

  // Check if source and destination are selected
  if (sourceStation === '' || destinationStation === '') {
    alert('Please select source and destination stations.');
    return;
  }

  // Dijkstra's algorithm implementation to find the shortest route and fare
  const stations = Object.keys(metroStations);
  const INF = Number.MAX_SAFE_INTEGER;

  // Create a distance matrix and initialize with Infinity
  const distances = {};
  stations.forEach((station) => (distances[station] = INF));
  distances[sourceStation] = 0;

  const visited = {};
  const path = {};

  while (true) {
    let currentStation = null;

    // Find the nearest station
    stations.forEach((station) => {
      if (
        !visited[station] &&
        (currentStation === null ||
          distances[station] < distances[currentStation])
      ) {
        currentStation = station;
      }
    });

    if (currentStation === null || distances[currentStation] === INF) {
      break;
    }

    visited[currentStation] = true;

    // Update distances to adjacent stations
    for (const neighbor in metroStations[currentStation]) {
      const distance =
        distances[currentStation] + metroStations[currentStation][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        path[neighbor] = currentStation;
      }
    }
  }

  // Build the route and calculate the fare
  const route = [];
  let current = destinationStation;
  while (current !== sourceStation) {
    route.unshift(current);
    current = path[current];
  }
  route.unshift(sourceStation);

  const fare = distances[destinationStation];

  // Display the results
  document.getElementById('route').textContent = route.join(' -> ');
  document.getElementById('fare').textContent = fare + ' units'; // You can replace 'units' with your currency
}
