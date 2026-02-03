import json
import re
from pathlib import Path

input_path = Path('rm_researchers20260203.jsonl')
output_path = Path('src/data/researchmap.json')

items = []
with input_path.open('r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line:
            items.append(json.loads(line))

def extract_names(field):
    out = {"ja": [], "en": []}
    if not field or not isinstance(field, dict):
        return out
    for lang in ["ja", "en"]:
        names = []
        for p in field.get(lang, []) or []:
            name = p.get("name")
            if name:
                names.append(name)
        out[lang] = names
    return out

def extract_links(obj):
    links = []
    for link in obj.get("see_also", []) or []:
        url = link.get("@id")
        label = link.get("label") or link.get("@id")
        if url:
            links.append({"label": label, "url": url})
    return links

def date_sort(s):
    if not s:
        return ""
    if re.match(r"^\d{4}$", s):
        return s + "-01-01"
    if re.match(r"^\d{4}-\d{2}$", s):
        return s + "-01"
    return s

researcher = None
interests = []
projects = []
published = []
presentations = []
misc = []
books = []

for obj in items:
    t = obj["insert"]["type"]
    m = obj.get("merge", {})

    if t == "researchers":
        researcher = {
            "permalink": m.get("permalink"),
            "name": {
                "ja": f"{m.get('family_name',{}).get('ja','')} {m.get('given_name',{}).get('ja','')}".strip(),
                "en": f"{m.get('given_name',{}).get('en','')} {m.get('family_name',{}).get('en','')}".strip()
            },
            "image": m.get("image"),
            "contact": m.get("contact_point"),
            "affiliations": m.get("affiliations", [])
        }

    elif t == "research_interests":
        interests.append({
            "ja": m.get("keyword", {}).get("ja"),
            "en": m.get("keyword", {}).get("en")
        })

    elif t == "research_projects":
        projects.append({
            "title": {
                "ja": m.get("research_project_title", {}).get("ja"),
                "en": m.get("research_project_title", {}).get("en")
            },
            "organization": {
                "ja": m.get("offer_organization", {}).get("ja"),
                "en": m.get("offer_organization", {}).get("en")
            },
            "system": {
                "ja": m.get("system_name", {}).get("ja"),
                "en": m.get("system_name", {}).get("en")
            },
            "from": m.get("from_date"),
            "to": m.get("to_date"),
            "role": m.get("research_project_owner_role")
        })

    elif t == "published_papers":
        published.append({
            "title": {
                "ja": m.get("paper_title", {}).get("ja"),
                "en": m.get("paper_title", {}).get("en")
            },
            "authors": extract_names(m.get("authors")),
            "publisher": {
                "ja": m.get("publisher", {}).get("ja"),
                "en": m.get("publisher", {}).get("en")
            },
            "venue": {
                "ja": m.get("publication_name", {}).get("ja"),
                "en": m.get("publication_name", {}).get("en")
            },
            "date": m.get("publication_date"),
            "date_sort": date_sort(m.get("publication_date")),
            "type": m.get("published_paper_type"),
            "pages": {
                "start": m.get("starting_page"),
                "end": m.get("ending_page")
            },
            "identifiers": m.get("identifiers", {}),
            "links": extract_links(m)
        })

    elif t == "presentations":
        presentations.append({
            "title": {
                "ja": m.get("presentation_title", {}).get("ja"),
                "en": m.get("presentation_title", {}).get("en")
            },
            "authors": extract_names(m.get("presenters")),
            "venue": {
                "ja": m.get("event", {}).get("ja"),
                "en": m.get("event", {}).get("en")
            },
            "date": m.get("publication_date") or m.get("from_event_date"),
            "date_sort": date_sort(m.get("publication_date") or m.get("from_event_date")),
            "links": extract_links(m)
        })

    elif t == "misc":
        misc.append({
            "title": {
                "ja": m.get("paper_title", {}).get("ja"),
                "en": m.get("paper_title", {}).get("en")
            },
            "authors": extract_names(m.get("authors")),
            "venue": {
                "ja": m.get("publication_name", {}).get("ja"),
                "en": m.get("publication_name", {}).get("en")
            },
            "publisher": {
                "ja": m.get("publisher", {}).get("ja"),
                "en": m.get("publisher", {}).get("en")
            },
            "date": m.get("publication_date"),
            "date_sort": date_sort(m.get("publication_date")),
            "identifiers": m.get("identifiers", {}),
            "links": extract_links(m)
        })

    elif t == "books_etc":
        books.append({
            "title": {
                "ja": m.get("book_title", {}).get("ja"),
                "en": m.get("book_title", {}).get("en")
            },
            "authors": extract_names(m.get("authors")),
            "publisher": {
                "ja": m.get("publisher", {}).get("ja"),
                "en": m.get("publisher", {}).get("en")
            },
            "date": m.get("publication_date"),
            "date_sort": date_sort(m.get("publication_date")),
            "identifiers": m.get("identifiers", {}),
            "links": extract_links(m)
        })

payload = {
    "researcher": researcher,
    "interests": interests,
    "research_projects": projects,
    "published_papers": published,
    "presentations": presentations,
    "misc": misc,
    "books": books
}

output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Wrote {output_path}")
