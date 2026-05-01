from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = "127.0.0.1"
PORT = 8000


class NoCacheHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), NoCacheHandler)
    print(f"Serving Flesh And Stone from {ROOT}")
    print(f"Open http://{HOST}:{PORT}/index.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
