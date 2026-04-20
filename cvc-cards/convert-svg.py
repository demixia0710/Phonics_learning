import asyncio
from playwright.async_api import async_playwright
from pathlib import Path
import os

async def convert_svg_to_png():
    svg_dir = Path('.')
    out_dir = Path('./images')
    out_dir.mkdir(exist_ok=True)
    
    svg_files = sorted(svg_dir.glob('*.svg'))
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        for svg_file in svg_files:
            svg_content = svg_file.read_text()
            
            # 创建HTML页面来渲染SVG
            html = f'''<!DOCTYPE html>
<html>
<head>
<style>
  * {{ margin: 0; padding: 0; }}
  body {{ background: transparent; }}
</style>
</head>
<body>{svg_content}</body>
</html>'''
            
            page = await browser.new_page()
            await page.set_content(html)
            
            # 获取SVG元素并截图
            svg_element = await page.query_selector('svg')
            box = await svg_element.bounding_box()
            
            # 设置视口大小为SVG尺寸
            await page.set_viewport_size({
                'width': int(box['width']),
                'height': int(box['height'])
            })
            
            png_name = svg_file.stem + '.png'
            png_path = out_dir / png_name
            
            await svg_element.screenshot(path=str(png_path))
            print(f"✓ {svg_file.name} -> {png_name} ({int(box['width'])}x{int(box['height'])})")
            
            await page.close()
        
        await browser.close()
    
    print(f"\n转换完成！共 {len(svg_files)} 张图片")

asyncio.run(convert_svg_to_png())
