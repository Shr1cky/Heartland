"""Usage: pnpm build && pnpm preview --port 4173, then: python3 scripts/contrast_check.py [url]
Needs: pip install playwright && playwright install chromium"""
import asyncio, os, sys
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/', json
from playwright.async_api import async_playwright
JS = r"""
() => {
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const v=m[1].split(',').map(x=>parseFloat(x)); return {r:v[0],g:v[1],b:v[2],a:v.length>3?v[3]:1}; };
  const lum = c => { const f = x => { x/=255; return x<=0.03928? x/12.92 : Math.pow((x+0.055)/1.055,2.4); }; return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b); };
  const bgOf = el => { for(let e=el;e;e=e.parentElement){ const c=parse(getComputedStyle(e).backgroundColor); if(c&&c.a>0.5) return c; } return {r:255,g:255,b:255,a:1}; };
  const out=[];
  for (const el of document.querySelectorAll('main *, .topbar *, .bottom-nav *')) {
    const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
    if(!own) continue;
    const r=el.getBoundingClientRect(); if(r.width===0||r.height===0) continue;
    const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.color==='transparent') continue;
    const fg=parse(cs.color); const bg=bgOf(el);
    const L1=lum(fg),L2=lum(bg); const cr=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    if(cr<3) out.push([el.tagName+'.'+(el.className||el.parentElement.className), el.textContent.trim().slice(0,30), cr.toFixed(2)]);
  }
  return out;
}
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
        pg=await b.new_page(viewport={'width':390,'height':844})
        await pg.goto(BASE)
        await pg.wait_for_selector('.hl-splash', state='detached', timeout=20000)
        await pg.get_by_text('Udforsk temaet').click(); await pg.wait_for_timeout(500)
        async def check(name):
            res=await pg.evaluate(JS); print(name, len(res)); [print('   ',x) for x in res[:12]]
        async def nav(label): await pg.locator('.bottom-nav button', has_text=label).click(); await pg.wait_for_timeout(400)
        await check('home')
        await nav('Udforsk'); await check('explore')
        await nav('Program'); await check('programme')
        await pg.locator('.talk-card').first.click(); await pg.wait_for_timeout(400); await check('talk')
        await nav('Spørgsmål'); await check('questions')
        await nav('Mit Heartland'); await check('my')
        await nav('Hjem'); await pg.locator('.dashboard-card.orange').click(); await pg.wait_for_timeout(400); await check('timeline')
        await nav('Hjem'); await pg.locator('.dashboard-card.cream').click(); await pg.wait_for_timeout(400); await check('glossary')
        await nav('Hjem'); await pg.locator('.home-literature > button').first.click(); await pg.wait_for_timeout(400); await check('ibsen')
        await nav('Hjem'); await pg.locator('.home-literature > button').nth(1).click(); await pg.wait_for_timeout(400); await check('yellow')
        await b.close()
asyncio.run(main())
