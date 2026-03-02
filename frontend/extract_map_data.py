import re
import os

input_file = r"c:\Users\nikhi\OneDrive\Desktop\try\trytest\src\components\IndiaMap.tsx"
output_file = r"c:\Users\nikhi\OneDrive\Desktop\try\trytest\src\components\indiaMapData.ts"

def extract_data():
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find path attributes
    # Looking for pattern: <path ... d="..." ... id="..." ... name="..." ... >
    # The attributes might be in any order, but usually they are consistent in this file.
    # Let's try to match the whole path block
    
    path_blocks = re.findall(r'<path(.*?)>\s*</path>', content, re.DOTALL)
    
    data = []
    
    for block in path_blocks:
        d_match = re.search(r'd="([^"]+)"', block)
        id_match = re.search(r'id="([^"]+)"', block)
        name_match = re.search(r'name="([^"]+)"', block)
        
        if d_match and id_match and name_match:
            data.append({
                "id": id_match.group(1),
                "name": name_match.group(1),
                "d": d_match.group(1)
            })
            
    # Write to Typescript file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("export const indiaMapData = [\n")
        for item in data:
            f.write(f"  {{\n")
            f.write(f"    id: \"{item['id']}\",\n")
            f.write(f"    name: \"{item['name']}\",\n")
            f.write(f"    d: \"{item['d']}\",\n")
            f.write(f"  }},\n")
        f.write("];\n")

    print(f"Extracted {len(data)} paths to {output_file}")

if __name__ == "__main__":
    extract_data()
