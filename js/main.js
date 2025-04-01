import { loadContent } from './contentLoader.js';
import { initChart } from './chart.js';

// Wait until DOM is loaded before initializing the functions
document.addEventListener('DOMContentLoaded', function () {
  const sidebarItems = document.querySelectorAll('.nav-item');
  const mainContent = document.getElementById('content');

  // Add event listeners for sidebar navigation and handle active state
  sidebarItems.forEach((item) => {
    item.addEventListener('click', function () {
      sidebarItems.forEach((i) => i.classList.remove('active'));
      this.classList.add('active');

      const contentId = this.getAttribute('data-content');
      loadContent(contentId, mainContent);
    });
  });

  // Set the "Dashboard" item as active by default and load its content
  const dashboardItem = document.querySelector(
    '.nav-item[data-content="dashboard"]'
  );
  if (dashboardItem) {
    dashboardItem.classList.add('active');
    loadContent('dashboard', mainContent);
  } else {
    console.warn('Dashboard sidebar item not found!');
  }

  // Initialize the chart on page load (for default dashboard content)
  initChart();
});
