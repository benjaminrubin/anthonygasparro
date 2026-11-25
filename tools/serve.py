#!/usr/bin/env python3
"""Local preview server that behaves like GitHub Pages.

    python3 tools/serve.py [port]      (default port 8765)

Unlike `python3 -m http.server`, this also serves /films for films.html, so the
site's extensionless links work locally, and it skips the folders GitHub Pages
does not publish (_archive, tools).
"""
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        first = path.lstrip("/").split("/", 1)[0]
        if first.startswith(("_", ".")) or first in ("tools", "README.md"):
            self.send_error(404)
            return None
        local = self.translate_path(path)
        if not os.path.exists(local) and os.path.isfile(local + ".html"):
            self.path = path + ".html"
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    print("Serving %s at http://localhost:%d" % (ROOT, port))
    http.server.ThreadingHTTPServer(("", port), Handler).serve_forever()
