// Function to load HTML content into the main section
export function loadContent(contentId, mainContent) {
  fetch(`${contentId}.html`)
    .then((response) => response.text())
    .then((htmlContent) => {
      mainContent.innerHTML = htmlContent;

      // After loading content, initialize the chart
      if (contentId === 'dashboard') {
        import('./chart.js').then((module) => {
          module.initChart();
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching content:', error);
    });
}
