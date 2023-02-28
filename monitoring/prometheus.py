from prometheus_client import Counter, Gauge, Histogram, start_http_server

# Create the Prometheus metrics
REQUESTS = Counter('http_requests_total', 'Total HTTP requests')
EXCEPTIONS = Counter('http_exceptions_total', 'Total HTTP exceptions')
LATENCY = Histogram('http_request_duration_seconds', 'HTTP request latency (seconds)')

def start_monitoring(port=8000):
    # Start the Prometheus HTTP server
    start_http_server(port)