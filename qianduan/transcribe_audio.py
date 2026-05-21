# -*- coding: utf-8 -*-
"""
西语专四听力音频转写脚本 - 使用 faster-whisper
"""
import os, json, sys
from datetime import timedelta

def log(msg):
    print(msg, flush=True)

AUDIO_DIR = r"F:\西语专四听力"
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "src", "data", "transcripts_output.json")

def main():
    log("=" * 60)
    log("西语专四听力音频转写工具")
    log("=" * 60)

    # 1. 扫描音频
    log("\n[1/3] 扫描音频文件...")
    files = sorted([f for f in os.listdir(AUDIO_DIR) if f.lower().endswith('.mp3')])
    if not files:
        log("错误: 未找到 MP3 文件")
        return

    for f in files:
        path = os.path.join(AUDIO_DIR, f)
        size_mb = os.path.getsize(path) / 1024 / 1024
        log(f"  {f} ({size_mb:.1f}MB)")
    log(f"共 {len(files)} 个文件")

    # 2. 加载模型 (medium 更快，质量也不错)
    log("\n[2/3] 加载 faster-whisper medium 模型...")
    log("(首次运行会自动下载模型，约 1.5GB)")
    from faster_whisper import WhisperModel
    model = WhisperModel("medium", device="cpu", compute_type="int8")
    log("模型加载完成，开始转写！\n")

    # 3. 开始转写
    results = {}
    for idx, f in enumerate(files, 1):
        path = os.path.join(AUDIO_DIR, f)
        size_mb = os.path.getsize(path) / 1024 / 1024
        log(f"[{idx}/{len(files)}] {f} ({size_mb:.1f}MB)...")

        try:
            segments, info = model.transcribe(path, language="es", beam_size=5)

            lines = []
            for i, seg in enumerate(segments):
                text = seg.text.strip()
                if text:
                    lines.append({
                        'number': i + 1,
                        'speaker': '',
                        'text': text,
                        'startTime': round(seg.start, 1),
                        'endTime': round(seg.end, 1),
                    })

            full_text = ' '.join(l['text'] for l in lines)
            total_sec = int(info.duration) if info.duration else 0
            log(f"  -> 完成! {len(lines)} 句, {total_sec//60}分{total_sec%60}秒")
            log(f"  首句: {lines[0]['text'][:80] if lines else '无'}")

            results[f] = {
                'full_text': full_text,
                'lines': lines,
                'duration_seconds': info.duration or 0
            }

            # 每完成一个文件就保存一次
            os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as fp:
                json.dump(results, fp, ensure_ascii=False, indent=2)

        except Exception as e:
            log(f"  !! 出错: {e}")
            import traceback
            traceback.print_exc()

    log(f"\n{'=' * 60}")
    log(f"全部完成! 共成功 {len(results)}/{len(files)} 个文件")
    log(f"结果已保存到: {OUTPUT_FILE}")

if __name__ == '__main__':
    main()
