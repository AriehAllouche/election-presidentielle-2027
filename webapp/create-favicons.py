from PIL import Image, ImageDraw, ImageFont
import os

# Créer le favicon SVG en PNG
def create_favicon(size):
    # Créer une image carrée
    img = Image.new('RGBA', (size, size), (37, 99, 235, 255))  # Blue-600
    draw = ImageDraw.Draw(img)
    
    # Essayer d'utiliser une police système, sinon utiliser la police par défaut
    try:
        font = ImageFont.truetype("arial.ttf", int(size * 0.5))
    except:
        font = ImageFont.load_default()
    
    # Dessiner le texte "27" centré
    text = "27"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) / 2
    y = (size - text_height) / 2 - (size * 0.05)
    
    draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))
    
    return img

# Créer les différentes tailles
sizes = [16, 32, 180]  # 16x16, 32x32, 180x180 (Apple Touch)

for size in sizes:
    img = create_favicon(size)
    
    if size == 16:
        filename = "favicon-16x16.png"
    elif size == 32:
        filename = "favicon-32x32.png"
    else:
        filename = "apple-touch-icon.png"
    
    img.save(filename, "PNG")
    print(f"✅ {filename} créé ({size}x{size})")

print("\n✨ Tous les favicons ont été générés !")
