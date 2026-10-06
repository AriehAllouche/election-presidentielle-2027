from PIL import Image, ImageDraw, ImageFont
import os

def create_og_image():
    # Dimensions LinkedIn recommandées : 1200x630
    width, height = 1200, 630
    
    # Créer l'image avec un dégradé
    img = Image.new('RGB', (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Dégradé de fond (bleu vers blanc)
    for y in range(height):
        ratio = y / height
        r = int(37 + (255 - 37) * ratio)
        g = int(99 + (255 - 99) * ratio)
        b = int(235 + (255 - 235) * ratio)
        draw.rectangle([(0, y), (width, y + 1)], fill=(r, g, b))
    
    # Essayer d'utiliser une police système
    try:
        title_font = ImageFont.truetype("arial.ttf", 72)
        subtitle_font = ImageFont.truetype("arial.ttf", 36)
        small_font = ImageFont.truetype("arial.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Dessiner le cercle du logo
    circle_radius = 80
    circle_x = width // 2
    circle_y = height // 2 - 50
    draw.ellipse([
        (circle_x - circle_radius, circle_y - circle_radius),
        (circle_x + circle_radius, circle_y + circle_radius)
    ], fill=(37, 99, 235))
    
    # Dessiner "27" dans le cercle
    text = "27"
    bbox = draw.textbbox((0, 0), text, font=title_font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = circle_x - text_width // 2
    y = circle_y - text_height // 2 + 10
    draw.text((x, y), text, font=title_font, fill=(255, 255, 255))
    
    # Titre principal
    title = "2027 & Moi"
    bbox = draw.textbbox((0, 0), title, font=title_font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y = circle_y + circle_radius + 40
    draw.text((x, y), title, font=title_font, fill=(31, 41, 55))
    
    # Sous-titre
    subtitle = "Boussole Présidentielle"
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y += 60
    draw.text((x, y), subtitle, font=subtitle_font, fill=(75, 85, 99))
    
    # Texte d'action
    action = "Découvrez votre profil politique"
    bbox = draw.textbbox((0, 0), action, font=small_font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y += 50
    draw.text((x, y), action, font=small_font, fill=(37, 99, 235))
    
    # Sauvegarder
    img.save("og-image.png", "PNG", quality=95)
    print("✅ og-image.png créé (1200x630)")

if __name__ == "__main__":
    create_og_image()
    print("\n✨ Image Open Graph générée avec succès !")
    print("📝 N'oubliez pas de mettre à jour l'URL dans index.html avec votre URL de production")
