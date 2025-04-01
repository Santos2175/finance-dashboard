import { createChart, createDataset, getChartData } from './utils.js';

// Variable to store the current chart instance
let currentChart = null;

// Function to initialize the chart with the canvas element
export function initChart() {
  const canvas = document.querySelector('.dashboard__group1__analytics__graph');
  const select = document.querySelector('.options');

  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  if (!select) {
    console.error('Dropdown element (.options) not found!');
    return;
  }

  // Initial chart creation (Weekly)
  const initialData = getChartData('Weekly');
  const dataset = createDataset(initialData.data1, initialData.data2);
  currentChart = createChart(
    initialData.labels,
    dataset,
    canvas,
    initialData.yMax,
    initialData.yStepSize
  );

  // Add event listener for dropdown change
  addDropdownEventListener(select);
}

// Function to add event listener to the dropdown for label change
function addDropdownEventListener(select) {
  // Remove existing listener to prevent duplicates
  select.removeEventListener('change', handleSelectChange);

  function handleSelectChange() {
    const selectedValue = select.value;
    const data = getChartData(selectedValue);
    const dataset = createDataset(data.data1, data.data2);

    // Destroy the current chart if it exists
    if (currentChart) {
      currentChart.destroy();
      currentChart = null;
    }

    // Get the canvas and clear it
    const canvas = document.querySelector(
      '.dashboard__group1__analytics__graph'
    );
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a new chart
    currentChart = createChart(
      data.labels,
      dataset,
      canvas,
      data.yMax,
      data.yStepSize
    );
  }

  select.addEventListener('change', handleSelectChange);
}
