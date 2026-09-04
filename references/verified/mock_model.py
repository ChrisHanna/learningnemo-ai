from http.server import BaseHTTPRequestHandler, HTTPServer
import json


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        size = int(self.headers.get("content-length", 0))
        self.rfile.read(size)
        body = {"choices": [{"message": {"role": "assistant", "content": "blocked"}}]}
        encoded = json.dumps(body).encode()
        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.send_header("content-length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def log_message(self, *_):
        pass


HTTPServer(("127.0.0.1", 8000), Handler).serve_forever()
