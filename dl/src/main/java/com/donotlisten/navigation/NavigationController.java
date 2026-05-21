package com.donotlisten.navigation;

import com.donotlisten.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    @GetMapping
    public ApiResponse<Map<String, Object>> getNavigation() {
        var years = new ArrayList<Map<String, Object>>();

        // ========== 英语四级 ==========
        var year2024 = new HashMap<String, Object>();
        year2024.put("title", "2024年");
        year2024.put("id", "year-2024");

        var months = new ArrayList<Map<String, Object>>();
        var june = new HashMap<String, Object>();
        june.put("title", "6月");
        june.put("id", "month-2024-6");

        var cet4Sets = new ArrayList<Map<String, Object>>();
        var set1 = new HashMap<String, Object>();
        set1.put("id", "set-4-1");
        set1.put("label", "第1套");

        var items = List.of(
                Map.of("id", "lecture-1", "label", "新闻报道", "type", "LECTURE", "year", 2024, "month", 6, "setNumber", 1, "level", 4),
                Map.of("id", "dialogue-1", "label", "对话", "type", "DIALOGUE", "year", 2024, "month", 6, "setNumber", 1, "level", 4),
                Map.of("id", "passage-1", "label", "短文", "type", "PASSAGE", "year", 2024, "month", 6, "setNumber", 1, "level", 4)
        );
        set1.put("items", items);
        cet4Sets.add(set1);
        june.put("cet4", cet4Sets);
        june.put("cet6", List.of());
        months.add(june);
        year2024.put("months", months);
        years.add(year2024);

        // ========== 西班牙语专四 (EEE-4) ==========
        // 2022年
        years.add(buildSpanishYear("2022年", "year-es-2022", 2022, List.of(
                Map.of("id", "es-2022-dialogo-1", "label", "对话：问路", "type", "DIALOGUE", "year", 2022, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2022-noticia-1", "label", "新闻：气候变化", "type", "LECTURE", "year", 2022, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2022-texto-1", "label", "短文：塞万提斯", "type", "PASSAGE", "year", 2022, "month", 6, "setNumber", 1, "level", 8)
        )));
        // 2023年
        years.add(buildSpanishYear("2023年", "year-es-2023", 2023, List.of(
                Map.of("id", "es-2023-dialogo-1", "label", "对话：餐厅点餐", "type", "DIALOGUE", "year", 2023, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2023-noticia-1", "label", "新闻：教育发展", "type", "LECTURE", "year", 2023, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2023-texto-1", "label", "短文：拉丁美洲文化", "type", "PASSAGE", "year", 2023, "month", 6, "setNumber", 1, "level", 8)
        )));
        // 2024年
        years.add(buildSpanishYear("2024年", "year-es-2024", 2024, List.of(
                Map.of("id", "es-2024-dialogo-1", "label", "对话：旅游规划", "type", "DIALOGUE", "year", 2024, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2024-noticia-1", "label", "新闻：科技创新", "type", "LECTURE", "year", 2024, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2024-texto-1", "label", "短文：西班牙美食", "type", "PASSAGE", "year", 2024, "month", 6, "setNumber", 1, "level", 8)
        )));
        // 2025年
        years.add(buildSpanishYear("2025年", "year-es-2025", 2025, List.of(
                Map.of("id", "es-2025-dialogo-1", "label", "对话：求职面试", "type", "DIALOGUE", "year", 2025, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2025-noticia-1", "label", "新闻：文化交流", "type", "LECTURE", "year", 2025, "month", 6, "setNumber", 1, "level", 8),
                Map.of("id", "es-2025-texto-1", "label", "短文：环境保护", "type", "PASSAGE", "year", 2025, "month", 6, "setNumber", 1, "level", 8)
        )));

        // ========== 专项训练 ==========
        var special = new ArrayList<Map<String, Object>>();

        var englishSpecial = new HashMap<String, Object>();
        englishSpecial.put("title", "英语专项训练");
        englishSpecial.put("id", "special-english");
        englishSpecial.put("items", List.of(
                Map.of("id", "lecture-1", "label", "新闻训练", "type", "LECTURE"),
                Map.of("id", "dialogue-1", "label", "对话训练", "type", "DIALOGUE"),
                Map.of("id", "passage-1", "label", "短文训练", "type", "PASSAGE")
        ));
        special.add(englishSpecial);

        var spanishSpecial = new HashMap<String, Object>();
        spanishSpecial.put("title", "西语专项训练");
        spanishSpecial.put("id", "special-spanish");
        spanishSpecial.put("items", List.of(
                Map.of("id", "es-2025-dialogo-1", "label", "对话训练", "type", "DIALOGUE"),
                Map.of("id", "es-2025-noticia-1", "label", "新闻训练", "type", "LECTURE"),
                Map.of("id", "es-2025-texto-1", "label", "短文训练", "type", "PASSAGE")
        ));
        special.add(spanishSpecial);

        var result = new HashMap<String, Object>();
        result.put("years", years);
        result.put("special", special);

        return ApiResponse.success(result);
    }

    private Map<String, Object> buildSpanishYear(String title, String id, int year,
                                                  List<Map<String, Object>> items) {
        var yearMap = new HashMap<String, Object>();
        yearMap.put("title", title);
        yearMap.put("id", id);

        var months = new ArrayList<Map<String, Object>>();
        var june = new HashMap<String, Object>();
        june.put("title", "6月");
        june.put("id", "month-" + year);

        var sets = new ArrayList<Map<String, Object>>();
        var set1 = new HashMap<String, Object>();
        set1.put("id", "set-es-" + year + "-1");
        set1.put("label", "第1套");
        set1.put("items", items);
        sets.add(set1);

        june.put("items", sets);
        months.add(june);
        yearMap.put("months", months);

        return yearMap;
    }
}
