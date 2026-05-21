package com.donotlisten.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AiService {

    @Value("${openai.api-key:}")
    private String apiKey;

    @Value("${openai.base-url:https://api.openai.com/v1}")
    private String baseUrl;

    @Value("${openai.model:gpt-3.5-turbo}")
    private String model;

    private final HttpClient client = HttpClient.newHttpClient();

    public String explain(String lineId) {
        if (apiKey == null || apiKey.isBlank()) {
            return fallbackAnalysis();
        }

        try {
            String prompt = "请分析这个英语听力句子，给出翻译、难点解析（连读、失爆、弱读、生词等）。使用【翻译】、【难点解析】作为段落标题。";
            String json = """
                {
                    "model": "%s",
                    "messages": [{"role": "user", "content": "%s"}],
                    "temperature": 0.3
                }
                """.formatted(model, prompt);

            var request = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + "/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                return response.body();
            }
        } catch (Exception ignored) {
            // fallback
        }

        return fallbackAnalysis();
    }

    private String fallbackAnalysis() {
        return """
            【翻译】这是英语听力句子。

            【难点解析】建议多听几遍，注意连读和生词。
            """.stripIndent();
    }
}
