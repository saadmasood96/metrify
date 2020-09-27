document.addEventListener("DOMContentLoaded", main);

async function main() {
  const trackFeatures = await getTrackFeatures();
  renderChart(trackFeatures);
}

async function getTrackFeatures() {
  const trackId = document.location.pathname.split('/track/')[1];
  const rawRes = await fetch(`http://localhost:3000/track-features/${trackId}`);
  const trackFeatures = await rawRes.json();
  return trackFeatures.features;
}

function renderChart(trackFeatures) {
  const ctx = document.querySelector('#track-chart').getContext('2d');
  const labels = Object.keys(trackFeatures).map(toTitleCase);
  const featuresData = Object.values(trackFeatures);
  const trackChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: null,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: featuresData
      }]
    },
    options: {
      legend: { display: false }
    }
  });

}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}