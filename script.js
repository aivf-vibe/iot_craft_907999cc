

// Sample sensor data
const sensorData = [
    { id: 'S001', name: 'Temperature Sensor A1', location: 'Building A', status: 'active', lastReading: '22.5°C', lastSeen: '2 min ago' },
    { id: 'S002', name: 'Humidity Monitor B2', location: 'Building B', status: 'active', lastReading: '65%', lastSeen: '1 min ago' },
    { id: 'S003', name: 'Motion Detector C3', location: 'Building C', status: 'warning', lastReading: 'Triggered', lastSeen: '5 min ago' },
    { id: 'S004', name: 'Pressure Sensor D4', location: 'Building D', status: 'error', lastReading: 'N/A', lastSeen: '1 hour ago' },
    { id: 'S005', name: 'Light Sensor E5', location: 'Building E', status: 'active', lastReading: '850 lux', lastSeen: '3 min ago' },
    { id: 'S006', name: 'Air Quality F6', location: 'Building F', status: 'active', lastReading: 'Good', lastSeen: '30 sec ago' },
    { id: 'S007', name: 'Vibration Sensor G7', location: 'Building G', status: 'warning', lastReading: '0.5G', lastSeen: '10 min ago' },
    { id: 'S008', name: 'Sound Level H8', location: 'Building H', status: 'active', lastReading: '45 dB', lastSeen: '1 min ago' }
];

// Sample alert data
const alertData = [
    { id: 'A001', type: 'error', message: 'Temperature Sensor A1: Critical threshold exceeded', time: '2 min ago', severity: 'high' },
    { id: 'A002', type: 'warning', message: 'Motion Detector C3: Unusual activity pattern detected', time: '5 min ago', severity: 'medium' },
    { id: 'A003', type: 'warning', message: 'Vibration Sensor G7: Calibration needed', time: '10 min ago', severity: 'medium' },
    { id: 'A004', type: 'error', message: 'Pressure Sensor D4: Connection timeout', time: '1 hour ago', severity: 'high' },
    { id: 'A005', type: 'info', message: 'System maintenance scheduled for tonight', time: '2 hours ago', severity: 'low' }
];

// Chart initialization
let activityChart;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    updateLastUpdateTime();
    setInterval(updateLastUpdateTime, 60000); // Update every minute
});

function initializeDashboard() {
    populateSensorList();
    populateAlertList();
    initializeChart();
    simulateRealTimeUpdates();
}

function setupEventListeners() {
    // Time range selector
    document.getElementById('timeRange').addEventListener('change', function() {
        updateChartData(this.value);
    });

    // Map view buttons
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateMapView(this.dataset.view);
        });
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function populateSensorList() {
    const sensorList = document.getElementById('sensorList');
    sensorList.innerHTML = '';

    sensorData.forEach(sensor => {
        const sensorItem = document.createElement('div');
        sensorItem.className = 'sensor-item';
        sensorItem.innerHTML = `
            <div class="sensor-info">
                <h4>${sensor.name}</h4>
                <p>${sensor.location} • ${sensor.lastSeen}</p>
            </div>
            <div class="sensor-status ${sensor.status}">${sensor.status}</div>
        `;
        sensorList.appendChild(sensorItem);
    });
}

function populateAlertList() {
    const alertList = document.getElementById('alertList');
    alertList.innerHTML = '';

    alertData.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alert.type}`;
        alertItem.innerHTML = `
            <h4>${alert.message}</h4>
            <p>${alert.time}</p>
        `;
        alertList.appendChild(alertItem);
    });
}

function initializeChart() {
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    // Generate sample data for 24 hours
    const labels = [];
    const activeData = [];
    const warningData = [];
    const errorData = [];
    
    for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
        activeData.push(Math.floor(Math.random() * 50) + 200);
        warningData.push(Math.floor(Math.random() * 10) + 5);
        errorData.push(Math.floor(Math.random() * 5) + 1);
    }

    activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Active Sensors',
                    data: activeData,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Warnings',
                    data: warningData,
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Errors',
                    data: errorData,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateChartData(timeRange) {
    // Simulate data update based on time range
    let labels, activeData, warningData, errorData;
    
    switch(timeRange) {
        case '7d':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            activeData = [220, 235, 245, 240, 250, 245, 247];
            warningData = [8, 12, 10, 15, 12, 10, 12];
            errorData = [2, 3, 4, 2, 3, 2, 3];
            break;
        case '30d':
            labels = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
            activeData = Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 200);
            warningData = Array.from({length: 30}, () => Math.floor(Math.random() * 10) + 5);
            errorData = Array.from({length: 30}, () => Math.floor(Math.random() * 5) + 1);
            break;
        default: // 24h
            labels = [];
            activeData = [];
            warningData = [];
            errorData = [];
            for (let i = 23; i >= 0; i--) {
                labels.push(`${i}:00`);
                activeData.push(Math.floor(Math.random() * 50) + 200);
                warningData.push(Math.floor(Math.random() * 10) + 5);
                errorData.push(Math.floor(Math.random() * 5) + 1);
            }
    }

    activityChart.data.labels = labels;
    activityChart.data.datasets[0].data = activeData;
    activityChart.data.datasets[1].data = warningData;
    activityChart.data.datasets[2].data = errorData;
    activityChart.update();
}

function updateMapView(view) {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    const views = {
        all: 'Displaying all 262 sensors across facilities',
        active: 'Displaying 247 active sensors',
        alerts: 'Displaying 15 sensors with alerts'
    };
    
    mapPlaceholder.innerHTML = `
        <i class="fas fa-map-marked-alt"></i>
        <p>${views[view]}</p>
    `;
}

function refreshData() {
    // Simulate data refresh
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.classList.add('loading');
    
    setTimeout(() => {
        // Update sensor counts
        document.getElementById('activeSensors').textContent = Math.floor(Math.random() * 10) + 245;
        document.getElementById('warningSensors').textContent = Math.floor(Math.random() * 5) + 10;
        document.getElementById('errorSensors').textContent = Math.floor(Math.random() * 3) + 2;
        document.getElementById('dataRate').textContent = (Math.random() * 2 + 1.5).toFixed(1) + 'GB/hr';
        
        // Update sensor list with new timestamps
        populateSensorList();
        
        refreshBtn.classList.remove('loading');
        updateLastUpdateTime();
    }, 1000);
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('lastUpdate').textContent = `Last updated: ${timeString}`;
}

function simulateRealTimeUpdates() {
    // Simulate real-time data updates every 30 seconds
    setInterval(() => {
        // Randomly update one sensor's status
        const randomIndex = Math.floor(Math.random() * sensorData.length);
        const statuses = ['active', 'warning', 'error'];
        sensorData[randomIndex].status = statuses[Math.floor(Math.random() * statuses.length)];
        sensorData[randomIndex].lastSeen = 'Just now';
        
        // Update the display
        populateSensorList();
    }, 30000);
}

// Utility functions
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getStatusColor(status) {
    const colors = {
        active: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
    };
    return colors[status] || '#6c757d';
}

// Export functions for potential external use
window.dashboard = {
    refreshData,
    updateChartData,
    updateMapView
};

