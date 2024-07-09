document.addEventListener('DOMContentLoaded', function() {
    const bars = document.querySelectorAll('.bar');
    const updateButton = document.getElementById('updateButton');
  
    // Initial data values
    let data = [800, 700, 600, 500, 400];
  
    // Function to update chart with new data
    function updateChart() {
      // Generate new random data values (for demo purposes)
      data = data.map(() => Math.floor(Math.random() * 100) + 1);
  
      // Update each bar height and data-value attribute
      bars.forEach((bar, index) => {
        bar.style.setProperty('--bar-height', `${data[index]}px`);
        bar.setAttribute('data-value', data[index]);
      });
    }
  
    // Update chart initially
    updateChart();
  
    // Update chart on button click
    updateButton.addEventListener('click', updateChart);
  });
  