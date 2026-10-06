import json
import os

# Chemins des fichiers source
DIR_SOURCE = ".."
FILE_CANDIDATS = os.path.join(DIR_SOURCE, "candidats.json")
FILE_PAROLES = os.path.join(DIR_SOURCE, "prises-de-parole.json")
FILE_VOTES = os.path.join(DIR_SOURCE, "votes.json")

# Fichier de destination
FILE_DEST = "data.js"

print("Génération du fichier data.js...")

with open(FILE_CANDIDATS, 'r', encoding='utf-8') as f:
    candidats_data = f.read()

with open(FILE_PAROLES, 'r', encoding='utf-8') as f:
    paroles_data = f.read()

with open(FILE_VOTES, 'r', encoding='utf-8') as f:
    votes_data = f.read()

js_content = f"""// Fichier généré automatiquement - Données Open Data
const openData = {{
    candidats: {candidats_data},
    prisesDeParole: {paroles_data},
    votes: {votes_data}
}};
"""

with open(FILE_DEST, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Fichier {FILE_DEST} généré avec succès ! Vous pouvez maintenant ouvrir index.html dans votre navigateur.")
