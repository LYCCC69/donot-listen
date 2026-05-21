# -*- coding: utf-8 -*-
"""转写所有11个音频并保存"""
import os, json
from faster_whisper import WhisperModel

AUDIO_DIR = r"F:\西语专四听力"
OUTPUT = r"C:\Users\ASUS\Desktop\新建文件夹\不听听力\qianduan\src\data\transcripts_output.json"

model = WhisperModel("tiny", device="cpu", compute_type="int8")

files = sorted([f for f in os.listdir(AUDIO_DIR) if f.lower().endswith('.mp3')])
results = {}
for idx, f in enumerate(files, 1):
    path = os.path.join(AUDIO_DIR, f)
    size = os.path.getsize(path) / 1024 / 1024
    print(f"[{idx}/{len(files)}] {f} ({size:.1f}MB)...", flush=True)

    segments, info = model.transcribe(path, language="es", beam_size=5)
    lines = []
    for i, seg in enumerate(segments):
        text = seg.text.strip()
        if text:
            lines.append({
                "number": i+1, "speaker": "",
                "text": text,
                "startTime": round(seg.start, 1),
                "endTime": round(seg.end, 1),
            })
    full = " ".join(l["text"] for l in lines)
    results[f] = {"full_text": full, "lines": lines, "duration": info.duration or 0}
    print(f"  -> {len(lines)} 句", flush=True)

os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
with open(OUTPUT, "w", encoding="utf-8") as fp:
    json.dump(results, fp, ensure_ascii=False, indent=2)
print(f"\n完成! 保存到 {OUTPUT}", flush=True)
