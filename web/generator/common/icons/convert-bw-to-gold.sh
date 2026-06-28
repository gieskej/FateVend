python -c "
import numpy as np
from PIL import Image, ImageFilter
import os, shutil

ICON_DIR = r'c:/Users/jeg00/Projects/FateVend/web/generator/common/icons'

targets = [
    'GENDERS#genderless.webp',
    'GENDERS#man.webp',
    'GENDERS#woman.webp',
    'GENDERS#non-binary.webp',
    'GENDERS#trans_man.webp',
    'GENDERS#trans_woman.webp',
    'GENDERS#genderfluid.webp',
    'GENDERS#androgyne.webp',
    'ORIENTATIONS#straight.webp',
    'ORIENTATIONS#gay.webp',
    'ORIENTATIONS#lesbian.webp',
    'ORIENTATIONS#bisexual.webp',
    'ORIENTATIONS#pansexual.webp',
    'ORIENTATIONS#asexual.webp',
    'ORIENTATIONS#questioning.webp',
]

def process(src_path, dst_path):
    img  = Image.open(src_path).convert('RGB')
    arr  = np.array(img, dtype=np.float32)
    gray = 0.299*arr[:,:,0] + 0.587*arr[:,:,1] + 0.114*arr[:,:,2]
    mask = (255 - gray) / 255.0
    H, W = mask.shape

    y = np.linspace(0.0, 1.0, H).reshape(-1,1)
    top = np.array([212,149,106])/255.0
    mid = np.array([184,115, 51])/255.0
    bot = np.array([122, 74, 30])/255.0

    def lerp(a,b,t): return a+(b-a)*t
    t0=(y/0.5).clip(0,1); t1=((y-0.5)/0.5).clip(0,1)
    r_ch=np.where(y<0.5,lerp(top[0],mid[0],t0),lerp(mid[0],bot[0],t1))
    g_ch=np.where(y<0.5,lerp(top[1],mid[1],t0),lerp(mid[1],bot[1],t1))
    b_ch=np.where(y<0.5,lerp(top[2],mid[2],t0),lerp(mid[2],bot[2],t1))
    gold=np.stack([np.broadcast_to(r_ch,(H,W)),
                   np.broadcast_to(g_ch,(H,W)),
                   np.broadcast_to(b_ch,(H,W))],axis=2).clip(0,1)

    mask_img=Image.fromarray((mask*255).astype(np.uint8),'L')
    blur=np.array(mask_img.filter(ImageFilter.GaussianBlur(6)),dtype=np.float32)/255.0
    p=8
    rim_l=np.zeros((H,W),np.float32); rim_r=np.zeros((H,W),np.float32)
    rim_l[:,p:]  =(blur[:,:-p]-blur[:,p:]).clip(0,1)
    rim_r[:,:-p] =(blur[:,p:]-blur[:,:-p]).clip(0,1)
    gold=(gold + rim_l[:,:,np.newaxis]*0.20 - rim_r[:,:,np.newaxis]*0.18).clip(0,1)

    pad_img=Image.new('L',(W+6,H+6),0); pad_img.paste(mask_img,(6,6))
    sh=np.array(pad_img.filter(ImageFilter.GaussianBlur(5)),dtype=np.float32)/255.0

    sym=np.zeros((H,W,4),np.float32); sym[:,:,:3]=gold; sym[:,:,3]=mask
    shd=np.zeros((H,W,4),np.float32); shd[:,:,3]=sh[:H,:W]*0.55

    def over(fg,bg):
        fa=fg[:,:,3:4]; ba=bg[:,:,3:4]; oa=fa+ba*(1-fa)
        oc=np.where(oa>0,(fg[:,:,:3]*fa+bg[:,:,:3]*ba*(1-fa))/np.maximum(oa,1e-6),0)
        return np.concatenate([oc,oa],axis=2)

    result=(over(sym,shd)*255).clip(0,255).astype(np.uint8)
    Image.fromarray(result,'RGBA').save(dst_path,'WEBP',quality=95)

for name in targets:
    src = os.path.join(ICON_DIR, name)
    if not os.path.exists(src):
        print(f'SKIP (not found): {name}')
        continue
    process(src, src)
    print(f'Done: {name}')
" 2>&1