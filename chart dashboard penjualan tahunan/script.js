// Ambil elemen canvas
const ctx = document.getElementById('myChart').getContext('2d');

// Data untuk diagram
const data = {
  labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
  datasets: [{
    label: 'Penjualan',
    data: [10, 20, 30, 40, 50, 60],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

// Konfigurasi diagram
const config = {
  type: 'bar', // Jenis diagram (bar, line, pie, dll.)
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// Inisialisasi Chart.js
new Chart(ctx, config);