#!/usr/bin/env python3
"""Launcher for the WorkHub React app (Workhub-labour-platform.jsx)."""
import subprocess
import sys
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = 5000
URL = f"http://localhost:{PORT}"


def main():
    if not (ROOT / "node_modules").exists():
        subprocess.run(["npm", "install"], cwd=ROOT, check=True)

    proc = subprocess.Popen(
        ["npm", "run", "dev", "--", "--port", str(PORT), "--host"], cwd=ROOT
    )
    try:
        webbrowser.open(URL)
        proc.wait()
    except KeyboardInterrupt:
        proc.terminate()
        sys.exit(0)


if __name__ == "__main__":
    main()
