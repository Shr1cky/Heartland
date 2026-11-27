"""Usage: pnpm build && pnpm preview --port 4173, then: python3 scripts/screenshots.py [url]
Needs: pip install playwright && playwright install chromium"""
import asyncio, os, sys
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/'
from playwright.async_api import async_playwright
OUT=os.environ.get('OUT','screenshots')
os.makedirs(OUT, exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
        pg = await b.new_page(viewport={'width':390,'height':844}, device_scale_factor=1)
        errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
        await pg.goto(BASE)
        import time
        t0=time.time()
        await pg.wait_for_timeout(500); await pg.screenshot(path=f'{OUT}/00_splash_a.png')
        await pg.wait_for_timeout(1300); await pg.screenshot(path=f'{OUT}/01_splash_b.png')
        await pg.wait_for_timeout(1800); await pg.screenshot(path=f'{OUT}/02_splash_c.png')
        await pg.wait_for_selector('.hl-splash', state='detached', timeout=15000)
        print('splash gone after', round(time.time()-t0,2),'s')
        await pg.wait_for_timeout(300); await pg.screenshot(path=f'{OUT}/03_welcome.png')
        await pg.get_by_text('Udforsk temaet').click(); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f'{OUT}/04_home.png', full_page=True)
        async def nav(label, name):
            await pg.locator('.bottom-nav button', has_text=label).click(); await pg.wait_for_timeout(700)
            await pg.screenshot(path=f'{OUT}/{name}.png', full_page=True)
        await nav('Udforsk','05_explore')
        await nav('Program','06_programme')
        await pg.locator('.talk-card').first.click(); await pg.wait_for_timeout(600)
        await pg.screenshot(path=f'{OUT}/07_talk.png', full_page=True)
        await nav('Spørgsmål','08_questions')
        await nav('Mit Heartland','09_my')
        await nav('Hjem','10_home2')
        await pg.locator('.dashboard-card.orange').click(); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f'{OUT}/11_timeline.png', full_page=True)
        await nav('Hjem','x')
        await pg.locator('.dashboard-card.cream').click(); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f'{OUT}/12_glossary.png', full_page=True)
        await nav('Hjem','x')
        await pg.locator('.home-literature > button').first.click(); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f'{OUT}/13_ibsen.png', full_page=True)
        await nav('Hjem','x')
        await pg.locator('.home-literature > button').nth(1).click(); await pg.wait_for_timeout(700)
        await pg.screenshot(path=f'{OUT}/14_yellow.png', full_page=True)
        print('errors:', [e for e in errs if 'unsplash' not in e and 'fonts.g' not in e][:10])
        await b.close()
asyncio.run(main())
