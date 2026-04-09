#!/usr/bin/env python3
"""Injects a version/commit banner into the main odoc index page only."""

import re
import sys

dest_dir, version, commit, commit_short, commit_date, gen_date, github_url = sys.argv[1:]

banner = (
    f'<div style="color:#666;padding:0.5rem 0;font-size:0.8rem;border-top:1px solid #ddd;margin-top:0.5rem;">'
    f'Version <strong>{version}</strong> &mdash; '
    f'generated from commit '
    f'<a href="{github_url}/tree/{commit}" style="color:#888;">{commit_short}</a> '
    f'({commit_date}) on {gen_date}'
    f'</div>'
)

target = f"{dest_dir}/iec_checker/index.html"
with open(target) as f:
    html = f.read()

# Insert banner at the end of the odoc-content div (before its closing </div>)
# which is the last </div> before </body>
html = html.replace('</div></body>', banner + '</div></body>', 1)

with open(target, 'w') as f:
    f.write(html)
