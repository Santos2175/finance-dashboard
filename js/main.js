import { loadContent } from './contentLoader.js';
import { initChart } from './chart.js';

document.addEventListener('DOMContentLoaded', function () {
  const sidebarItems = document.querySelectorAll('.nav-item');
  const mainContent = document.getElementById('content');

  sidebarItems.forEach((item) => {
    item.addEventListener('click', function () {
      sidebarItems.forEach((i) => i.classList.remove('active'));
      this.classList.add('active');

      const contentId = this.getAttribute('data-content');
      loadContent(contentId, mainContent);
    });
  });

  const dashboardItem = document.querySelector(
    '.nav-item[data-content="dashboard"]'
  );
  if (dashboardItem) {
    dashboardItem.classList.add('active');
    loadContent('dashboard', mainContent);

    // Using MutationObserver to detect when .overview-card is added
    const observer = new MutationObserver((mutationsList, observer) => {
      const overviewCards = document.querySelectorAll('.overview-card');
      if (overviewCards.length) {
        overviewCards.forEach((overviewCard) => {
          const arrowIcon = overviewCard.querySelector('.arrow-icon');
          if (arrowIcon) {
            const defaultIcon = '../assets/arrow-right.svg';
            const hoverIcon = '../assets/arrow-right-hover.svg';

            // Add mouseenter event to change the icon on hover
            overviewCard.addEventListener('mouseenter', function () {
              arrowIcon.src = hoverIcon;
            });

            // Add mouseleave event to reset the icon
            overviewCard.addEventListener('mouseleave', function () {
              arrowIcon.src = defaultIcon;
            });
          }
        });

        observer.disconnect();
      }
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    console.warn('Dashboard sidebar item not found!');
  }

  initChart();
});
