document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('.dashboard__group__analytics__graph');
  const select = document.querySelector('.options');
  let chart;

  // Function to create chart
  function createChart(labelType) {
    if (chart) {
      chart.destroy();
    }

    let labels = [];
    let data1 = [];
    let data2 = [];
    let yMin = 0;
    let yMax = 20000;
    let yStepSize = 5000;

    // for weekly
    if (labelType === 'Weekly') {
      labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      data1 = [5000, 2000, 10000, 8000, 9000, 7000, 15000];
      data2 = [4000, 1800, 8000, 4000, 6000, 7200, 12000];
      yMax = 20000;
      yStepSize = 5000;

      // for monthly
    } else if (labelType === 'Monthly') {
      labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];
      data1 = [
        5000, 10000, 15000, 20000, 10000, 18000, 25000, 21000, 30000, 31000,
        35000, 45000,
      ];
      data2 = [
        4000, 7000, 10000, 13000, 9000, 15000, 11000, 14000, 12000, 11000,
        20000, 25000,
      ];
      yMax = 50000;
      yStepSize = 10000;

      // for yearly
    } else if (labelType === 'Yearly') {
      labels = [
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
      ];
      data1 = [
        50000, 80000, 12000, 25000, 35000, 60000, 50000, 40000, 60000, 90000,
      ];
      data2 = [
        40000, 70000, 10000, 20000, 3000, 45000, 39000, 45000, 50000, 70000,
      ];
      yMax = 100000;
      yStepSize = 20000;
    }

    // chart to show data
    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Label 1',
            data: data1,
            borderColor: '#4745A4',
            backgroundColor: 'rgba(71, 69, 164, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#4745A4',
            pointHoverRadius: 5,
            lineWidth: 2,
          },
          {
            label: 'Label 2',
            data: data2,
            borderColor: '#F8CD70',
            backgroundColor: 'rgba(250, 205, 109, 0.4)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#F8CD70',
            pointHoverRadius: 5,
            lineWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: 'nearest',
            position: 'nearest',
            intersect: true,
            callbacks: {
              label: function (tooltipItem) {
                let value = tooltipItem.raw;
                return value >= 1000 ? value / 1000 + 'k' : value;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 14,
                weight: 400,
                color: '#73788f',
              },
            },
          },
          y: {
            beginAtZero: true,
            min: yMin, // Set dynamic Y-axis min value
            max: yMax, // Set dynamic Y-axis max value
            ticks: {
              stepSize: yStepSize, // Set dynamic step size
              callback: function (value) {
                return value >= 1000 ? value / 1000 + 'k' : value;
              },
              font: {
                size: 14,
                weight: 400,
                color: '#73788f',
              },
            },
            grid: {
              drawBorder: false,
              display: true,
              lineWidth: 1,
              drawOnChartArea: true,
              color: 'rgba(0, 0, 0, 0.2)',
              borderDash: [12, 12],
            },
          },
        },
      },
    });
  }

  // add event listener to act on option change
  select.addEventListener('change', function () {
    createChart(this.value);
  });

  // default weekly chart on page re-load
  createChart('Weekly');
});
